import {TableTransaction} from "../../components/TableTransaction/TableTransaction";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import styles from "./index.module.css";

export const Transactions = () => {

  const {user} = useParams<{ user: string }>();
  const {year} = useParams<{ year: string }>();
  const {month} = useParams<{ month: string }>();

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const promise = fetch(`http://family-budget.loc/api/transactions?user=${user}&year=${year}&month=${month}`, {
      method: "GET",
      headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
    });
    promise
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setTransactions(data?.transactions);
      });
  }, []);

  return (
    <div>
      <div className={styles.up}>

      </div>
      <div className={styles.down}>
        <TableTransaction title={'Расходы'} type_category={2} transactions={transactions}/>
        <TableTransaction title={'Доходы'} type_category={1} transactions={transactions}/>
      </div>
    </div>
  );
}