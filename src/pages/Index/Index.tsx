import styles from "./index.module.css";
import {User} from "../../components/User/User";
import {Indicator} from "../../components/Indicator/Indicator";
import {TableSummary} from "../../components/TableSummary/TableSummary";
import {Button} from "../../components/Button";
import {IPrimaryData} from "../../types/primaryData";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {MainContext, MainProvider} from "../../context/MainContext";
import {ISummaryPrimaryData} from "../../types/summaryPrimaryData";
import {ITransactionPrimaryData} from "../../types/transactionPrimaryData";
import {IBlog} from "../../types/blog";

export const Index = () => {

  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const promise = fetch(`http://family-budget.loc/api/blog`, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    });
    promise
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setBlog(data?.blog);
      });
  }, []);

  return (
    <div className={styles.main}>
      {
        blog.map(({id, title, content}: IBlog) => (
          <div key={id} className={styles.post}>
            <div className={styles.title}>{title}</div>
            <div className={styles.content}>{content}</div>
          </div>
        ))
      }
    </div>
  );
}