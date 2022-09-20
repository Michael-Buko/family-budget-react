import {useContext, useEffect, useState} from "react";
import {Button} from "../components/Button/Button";
import {Input} from "../components/Input/Input";
import {Title} from "../components/Title/Title";
import styles from "./index.module.css";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";


export const Logout = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const history = useHistory();
  // const [error, setError] = useState("");
  const authContext = useContext(AuthContext);



  const token = localStorage.getItem("token");


  const promise = fetch("http://family-budget.loc/api/auth/logout", {
    method: "POST",
    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
  });

  promise
    .then((response) => {
      return response.json();
    })
    .then((data) => {

    });

  authContext.setUser(null);
console.log(localStorage);
  useEffect(() => {
    history.push('/');
    return () => {
    };
  }, []);


  return (
    <>
      <h1>logout</h1>
    </>
  );
};
