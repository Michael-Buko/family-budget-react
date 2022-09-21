import styles from "./index.module.css";
import {Button} from "../Button";
import {ReactNode, useEffect} from "react";

interface IProps {
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({children, onClose}: IProps) => {


  useEffect(() => {
    return () => {
      window.location.reload();
    };
  }, []);


  return (
    <div className={styles.modal}>
      <div className={styles.substrate} onClick={onClose}>
        <div className={styles.dialog} onClick={event => event.stopPropagation()}>
          <div className={styles.button}>
            <Button text={"X"} disabled={false} onClick={onClose} type={'close'}/>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}