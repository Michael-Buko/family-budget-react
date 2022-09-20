import {useContext, useState} from "react";
import styles from "./index.module.css";
import {AuthContext} from "../../context/AuthContext";
import {User} from "../User/User";
import {Button} from "../Button";
import {Link} from "react-router-dom";

export const Header = () => {
  const authContext = useContext(AuthContext);
  const user = authContext.user;

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = 1 + today.getMonth();
  const user_id = user?.id;

  return (
    <div className={styles.header}>
      <div className={styles.up}>
        {user ?
          <User username={user?.username}/> :
          <Link to={"/login"}>
            <Button text={"Войти"} disabled={false}/>
          </Link>
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
      </div>
    </div>
  );
};
