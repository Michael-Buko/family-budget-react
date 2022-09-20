import {useContext, useEffect, useState} from "react";
import {User} from "../User/User";
import styles from "./index.module.css";
import {Link, useParams} from "react-router-dom";
import {Indicator} from "../Indicator/Indicator";
import {IPrimaryData} from "../../types/primaryData";
import {ISummary} from "../../types/summary";
import {ITransaction} from "../../types/transaction";
import {Button} from "../Button";
import {AuthContext} from "../../context/AuthContext";


export const Test = () => {

  const authContext = useContext(AuthContext);
  const user = authContext.user;

  return (

    <div>
      <h1>TEST</h1>
      {user ?
        <>
          <Link to={"/logout"}>
            Logout
          </Link>
        </>
        :
        <>
          <Link to="/login">
            <Button text={"Login"} disabled={false}/>
          </Link>
          <Link to={"/registration"}>
            Registration
          </Link>
        </>
      }
    </div>
  );
};
