import styles from "./index.module.css";
import {ISummary} from "../../types/summary";
import {ITransactionPrimaryData} from "../../types/transactionPrimaryData";
import {ISummaryPrimaryData} from "../../types/summaryPrimaryData";

interface IProps {
  title: string,
  type_category: number,
  summary: ISummary[],
  transactionPrimaryData: ITransactionPrimaryData[],
  summaryPrimaryData: ISummaryPrimaryData[],
}

export const TableSummary = ({title, type_category, summary, transactionPrimaryData, summaryPrimaryData}: IProps) => {

  let plannedAmount = 0;
  let transactionAmount = 0;

  summaryPrimaryData.map(({type_id, planned_amount}: ISummaryPrimaryData) => (
    type_id === type_category ? plannedAmount = planned_amount : ''
  ));

  transactionPrimaryData.map(({type_id, amount}: ITransactionPrimaryData) => (
    type_id === type_category ? transactionAmount = amount : ''
  ));

  return (
    <div className={styles.main}>
      <div>
        <table>
          <caption>{title}</caption>
          <tbody>
          <tr>
            <th>Категории</th>
            <th>Планируемые</th>
            <th>Фактические</th>
            <th>Разница</th>
          </tr>
          <tr>
            <th>Итого</th>
            <td>{plannedAmount}</td>
            <td>{transactionAmount}</td>
            <td>{plannedAmount - transactionAmount}</td>
          </tr>
          {summary.map(({id, user_id, date, category_id, planned_amount, amount, title, type_id}: ISummary) => (
            (type_id === type_category) ? <tr key={id}>
              <td>{title}</td>
              <td>{planned_amount}</td>
              <td>{amount}</td>
              <td>{planned_amount - amount}</td>
            </tr> : ''
          ))}
          </tbody>
        </table>
      </div>
      <div></div>
    </div>
  );
}
