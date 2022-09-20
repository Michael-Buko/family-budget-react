import styles from "./index.module.css";
import {Button} from "../Button/Button";

interface IProps {
    text: string;
    removeTodo?: () => void;
    editTodo?: () => void;
}

export const TodoItem = ({text, removeTodo, editTodo}: IProps) => {

    return (
        <li className={styles.item}>
            <div className={styles.p} >{text}</div>
            <Button text={"Edit"} disabled={false} className={styles.butt_edit} onClick={editTodo}/>
            <Button text={"Done"} disabled={false} className={styles.butt_done} onClick={() => {}}/>
            <Button text={"X"} disabled={false} type={"close"} onClick={removeTodo}/>
        </li>
    )
}
