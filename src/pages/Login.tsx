import {useContext, useState} from "react";
import {Button} from "../components/Button/Button";
import {Input} from "../components/Input/Input";
import {Title} from "../components/Title/Title";
import styles from "./index.module.css";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

// import axios from 'axios';

const _emailRegExp = /(^|\s+)[\w\-.]+@([\w-]+\.)+[\w-]{2,4}($|\s+)/;

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [error, setError] = useState("");
  const authContext = useContext(AuthContext);


  const onClick = () => {
    if (_emailRegExp.test(email) === false) {
      setError("Неверный email");
    } else {
      setError("");
    }

    if (password === "") {
      setError("Введите пароль");
    } else {
      setError("");
    }

    // axios.post('http://family-budget.loc/api/login', {
    //     email: 'test@test.com',
    //     password: 'test'
    // })
    //   .then(function (response) {
    //       console.log(response);
    //   })
    //   .catch(function (error) {
    //       console.log(error);
    //   });

    const promise = fetch("http://family-budget.loc/api/auth/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email: email, password: password}),
    });

    promise
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data?.detail?.includes("No active account found with the given credentials")) {
          setError("Неверный логин или пароль");
          return;
        }

        if (data?.email?.includes("This field may not be blank.")) {
          setError("Введите Email");
          return;
        }

        if (data?.password?.includes("This field may not be blank.")) {
          setError("Введите пароль");
          return;
        }

        if (data?.token) {
          localStorage.setItem("token", data?.token);
          // localStorage.setItem("refresh", data?.refresh);

          history.push("/");

          return fetch("http://family-budget.loc/api/auth/user", {
            method: 'GET',
            headers: {Authorization: `Bearer ${data?.token}`},
          })
            .then((response) => {
              return response?.json();
            })
            .then((data) => {
                authContext.setUser(data);
              }
            );

        }


      })
  };


  return (
    <div className={`${styles.container} `}>
      <Title text="Login"/>
      <div className={`${styles.regAndLog}`}>
        <Input
          value={email}
          setValue={setEmail}
          label={"Email"}
          placeholder="email"
        />
        <Input
          value={password}
          setValue={setPassword}
          label="Password"
          placeholder="password"
        />
        <p style={{color: "red"}}>{error}</p>
        <Button text="Login" onClick={onClick} type="primary" disabled={false}/>
      </div>
    </div>
  );
};
