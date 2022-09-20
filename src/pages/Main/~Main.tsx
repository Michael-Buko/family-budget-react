import styles from "./index.module.css";
import {User} from "../../components/User/User";
import {Indicator} from "../../components/Indicator/Indicator";
import {TableSummary} from "../../components/TableSummary/TableSummary";
import {Button} from "../../components/Button";
import {IPrimaryData} from "../../types/primaryData";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {MainContext, MainProvider} from "../../context/MainContext";

export const Main = () => {

  const {user} = useParams<{ user: string }>();
  const {year} = useParams<{ year: string }>();
  const {month} = useParams<{ month: string }>();

  const mainContext = useContext(MainContext);
  mainContext.setUser(user);
  mainContext.setYear(year);
  mainContext.setMonth(month);
  const {primaryData: primaryData} = mainContext;

  const dateFormat = (date: string) => {
    const arrDate = date.split('-');
    return arrDate[0] + ' - ' + arrDate[1];
  };

  return (
    <div>
      {primaryData.map(({primary_data_id, user_id, user_name, date, initial_amount}: IPrimaryData) => (
        <div key={primary_data_id} className={styles.up}>
          <Indicator title={'Дата'} content={dateFormat(date)}/>
          <Indicator title={'Начальная сумма'} content={initial_amount}/>
          <Indicator title={'Пользователь'} content={user_name}/>
        </div>
      ))}
      <div className={styles.down}>
        {/*<Table title={'Расходы'}/>*/}
        {/*<Table title={'Доходы'}/>*/}
      </div>
      <div>
        <Button text={'Добавить категорию'} disabled={false}/>
      </div>
    </div>
  );
}