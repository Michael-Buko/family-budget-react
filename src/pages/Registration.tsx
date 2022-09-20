import {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import {Button} from "../components/Button/Button";
import {Header} from "../components/Header/Header";
import {Input} from "../components/Input/Input";
import {Title} from "../components/Title/Title";
import styles from "./index.module.css";
import {Context} from "../context/ThemeContext";

const _emailRegExp = /(^|\s+)[\w\-.]+@([\w-]+\.)+[\w-]{2,4}($|\s+)/;

export const Registration = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();

    const context = useContext(Context);

    const onClick = () => {
        if (_emailRegExp.test(email) === false) {
            setError("Неверный email");
        } else {
            setError("");
        }

        if (password === "") {
            setError("Введите пороль");
        } else {
            setError("");
        }

        if (password !== passwordConf) {
            setError("Пороли не совпадают");
        } else {
            setError("");
        }

        if (name.trim() === "") {
            setError("Введите имя");
        } else {
            setError("");
        }

        const promise = fetch("https://studapi.teachmeskills.by/auth/users/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username: name, email: email, password: password}),
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

                history.push("/registration/success");

            });
    };
    return (
        <div className={`${styles.container} ${context.isDark ? styles.darkContainer : ""}`}>
            <Title text="Sing Up"/>
            <div className={`${styles.regAndLog}`}>
                <Input value={name} setValue={setName} label={"Name"} placeholder="name"/>
                <Input value={email} setValue={setEmail} label={"Email"} placeholder="email"/>
                <Input value={password} setValue={setPassword} label={"Password"} placeholder="password"/>
                <Input
                    value={passwordConf}
                    setValue={setPasswordConf}
                    label="Confirm password"
                    placeholder="confirm password"
                />
                <p style={{color: "red"}}>{error}</p>
                <Button text="Sign Up" onClick={onClick} type="primary" disabled={false}/>
            </div>
        </div>
    );
};
