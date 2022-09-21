import {useContext, useState} from "react";
import styles from "./index.module.css";
import {AuthContext} from "../../context/AuthContext";
import {User} from "../User/User";
import {Button} from "../Button";
import {Link, useHistory} from "react-router-dom";
import {Modal} from "../Modal/Modal";
import {Login} from "../../pages/Login";
import {Title} from "../Title/Title";
import {Input} from "../Input/Input";

const _emailRegExp = /(^|\s+)[\w\-.]+@([\w-]+\.)+[\w-]{2,4}($|\s+)/;
export const Header = () => {
  const authContext = useContext(AuthContext);
  const user = authContext.user;

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = 1 + today.getMonth();
  const user_id = user?.id;

  ////////////// LOGIN /////////////////////

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [error, setError] = useState("");


  const onClickLogin = () => {
    if (_emailRegExp.test(email) === false) {
      setError("Неверный email");
      return;
    } else {
      setError("");
    }

    if (password === "") {
      setError("Введите пароль");
      return;
    } else {
      setError("");
    }

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

          history.push("/");
          setIsModalShowed(false);
          setEmail("");
          setPassword("");

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

  ////////////// REGISTRATION ////////////////////

  const [name, setName] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const onClickRegistration = () => {
    if (_emailRegExp.test(email) === false) {
      setError("Неверный email");
      return;
    } else {
      setError("");
    }

    if (password === "") {
      setError("Введите пороль");
      return;
    } else {
      setError("");
    }

    if (password !== passwordConf) {
      setError("Пороли не совпадают");
      return;
    } else {
      setError("");
    }

    if (name.trim() === "") {
      setError("Введите имя");
      return;
    } else {
      setError("");
    }

    const promise = fetch("http://family-budget.loc/api/auth/register", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name: name, email: email, password: password}),
    });

    promise
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data?.email?.includes("user with this Email already exists.")) {
          setError("Пользователь с таким email существует");
          return;
        }

        if (data?.username?.includes("A user with that username already exists.")) {
          setError("Пользователь с таким именем уже существует");
          return;
        }

        if (data?.password?.includes("This password is too common.")) {
          setError("Пороль слишком простой");
          return;
        }

        history.push("/");
        setIsRegModalShowed(false);
        setName("");
        setEmail("");
        setPassword("");
        setPasswordConf("");
        setIsRegOkModalShowed(true);

      });
  };

  //////////////////////////////////////
  const [isModalShowed, setIsModalShowed] = useState(false);
  const [isRegModalShowed, setIsRegModalShowed] = useState(false);
  const [isRegOkModalShowed, setIsRegOkModalShowed] = useState(false);

  //////////////////////////////////////

  return (
    <div className={styles.header}>
      <div className={styles.up}>
        {user ?
          <User username={user?.username}/> :
          // <Link to={"/login"}>
          <>
            <Button text={"Войти"} disabled={false} onClick={() => setIsModalShowed(true)}/>
            <Button text={"Регистрация"} disabled={false} onClick={() => setIsRegModalShowed(true)}/>
          </>
          // </Link>
        }
      </div>
      <div className={styles.down}>
        <Link to={"/"}>
          <Button text={'Главная'} disabled={false}/>
        </Link>
        {user ?
          <>
            <Link to={`/main/${user_id}/${todayYear}/${todayMonth}`}>
              <Button text={'Итоги'} disabled={false}/>
            </Link>
            <Link to={`/transactions/${user_id}/${todayYear}/${todayMonth}`}>
              <Button text={'Транзакции'} disabled={false}/>
            </Link>
          </> :
          null
        }
        {user?.username === 'admin' ?
          <>
            <Link to={`/admin`}>
              <Button text={'Админка'} disabled={false}/>
            </Link>
          </> :
          null
        }
      </div>
      {/*//////////////////////////////////*/}
      {isModalShowed ? (
        <Modal onClose={() => setIsModalShowed(false)}>
          <div className={`${styles.container} `}>
            <Title text="Вход"/>
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
              <Button text="Войти" onClick={onClickLogin} type="primary" disabled={false}/>
            </div>
          </div>
        </Modal>
      ) : ''}
      {/*//////////////////////////////////*/}
      {isRegModalShowed ? (
        <Modal onClose={() => setIsRegModalShowed(false)}>
          <div className={`${styles.container} `}>
            <Title text="Регистрация"/>
            <div className={`${styles.regAndLog}`}>
              <Input
                value={name}
                setValue={setName}
                label={"Name"}
                placeholder="name"/>
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
              <Input
                value={passwordConf}
                setValue={setPasswordConf}
                label="Confirm password"
                placeholder="confirm password"
              />
              <p style={{color: "red"}}>{error}</p>
              <Button text="Зарегистрировать" onClick={onClickRegistration} type="primary" disabled={false}/>
            </div>
          </div>
        </Modal>
      ) : ''}

      {/*//////////////////////////////////*/}

      {isRegOkModalShowed ? (
        <Modal onClose={() => setIsRegOkModalShowed(false)}>
          <div className={`${styles.container} `}>
            <Title text="Регистрация"/>
            <div className={`${styles.regAndLog}`}>
              <p style={{color: "red"}}>{'Зарегистрирован'}</p>
              <Button text="Ok" onClick={() => setIsRegOkModalShowed(false)} type="primary" disabled={false}/>
            </div>
          </div>
        </Modal>
      ) : ''}


      {/*//////////////////////////////////*/}


    </div>
  );
};