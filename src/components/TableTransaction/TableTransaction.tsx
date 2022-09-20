import styles from "./index.module.css";
import {ITransactions} from "../../types/transactions";
import {Button} from "../Button";

interface IProps {
  title: string,
  type_category: number,
  transactions: ITransactions[],
}

export const TableTransaction = ({title, type_category, transactions}: IProps) => {

  const dateFormat = (date: string) => {
    const arrDate = date.split('-');
    return arrDate[0] + ' - ' + arrDate[1];
  };

  return (
    <div className={styles.main}>
      <div>
        <div className={styles.caption}>
          <div className={styles.title}>{title}</div>
          <Button text={'Добавить'} disabled={false}/>
        </div>
        <table>
          <tbody>
          <tr>
            <th>Дата</th>
            <th>Сумма</th>
            <th>Категория</th>
            <th>Описание</th>
          </tr>
          {transactions.map(({
                               id,
                               date,
                               title,
                               amount,
                               description,
                               type_id
                             }: ITransactions) => (
            (type_id === type_category) ?
              <tr key={id}>
                <td>{date}</td>
                <td>{amount}</td>
                <td>{title}</td>
                <td>{description}</td>
              </tr> : ''
          ))}
          </tbody>
        </table>
      </div>
      <div></div>
    </div>
  );
}
