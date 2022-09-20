import styles from "./index.module.css";

interface IProps {
  title: string,
  content: number | string,
}

export const Indicator = ({title, content}: IProps) => {
  return (
    <div>
      <div>{title}</div>
      <div className={styles.amount}>{content}</div>
    </div>
  );
}