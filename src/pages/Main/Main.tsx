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

export const Main = () => {

  const {user} = useParams<{ user: string }>();
  const {year} = useParams<{ year: string }>();
  const {month} = useParams<{ month: string }>();

  const [primaryData, setPrimaryData] = useState([]);
  const [transactionPrimaryData, settransactionPrimaryData] = useState([]);
  const [summaryPrimaryData, setsummaryPrimaryData] = useState([]);
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const promise = fetch(`http://family-budget.loc/api/main?user=${user}&year=${year}&month=${month}`, {
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
        setPrimaryData(data?.primaryData);
        settransactionPrimaryData(data?.transactionPrimaryData);
        setsummaryPrimaryData(data?.summaryPrimaryData);
        setSummary(data?.summary);
      });
  }, []);

  const dateFormat = (date: string) => {
    const arrDate = date.split('-');
    return arrDate[0] + ' - ' + arrDate[1];
  };

  let datePrimary = '';
  let initialAmount = 0;
  let userName = '';
  primaryData.map(({primary_data_id, user_id, user_name, date, initial_amount}: IPrimaryData) => {
    datePrimary = dateFormat(date);
    initialAmount = initial_amount;
    userName = user_name;
  });

  let transactionAmount1: number = 0;
  let transactionAmount2: number = 0;
  transactionPrimaryData.map(({type_id, amount}: ITransactionPrimaryData) => (
    type_id === 1 ? transactionAmount1 = Number(amount) : transactionAmount2 = Number(amount)
  ));

  return (
    <div>
      <div className={styles.up}>
        <Indicator title={'Дата'} content={datePrimary}/>
        <Indicator title={'Начальная сумма'} content={initialAmount}/>
        {/*<Indicator title={'Пользователь'} content={userName}/>*/}
        <Indicator
          title={'Остаток на конец месяца'}
          content={initialAmount + transactionAmount1 - transactionAmount2}
        />
        <Indicator
          title={(transactionAmount1 - transactionAmount2) > 0 ? 'Сэкономлено в этом месяце' : 'Потрачено в этом месяце'}
          content={transactionAmount1 - transactionAmount2}
        />
      </div>
      <div className={styles.down}>
        <TableSummary
          title={'Расходы'}
          type_category={2}
          summary={summary}
          summaryPrimaryData={summaryPrimaryData}
          transactionPrimaryData={transactionPrimaryData}
        />
        <TableSummary
          title={'Доходы'}
          type_category={1}
          summary={summary}
          summaryPrimaryData={summaryPrimaryData}
          transactionPrimaryData={transactionPrimaryData}
        />
      </div>
      <div>
        <Button text={'Добавить категорию'} disabled={false}/>
      </div>
    </div>
  );
}