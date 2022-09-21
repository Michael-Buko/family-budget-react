import styles from "./user.module.css";
import {Button} from "../Button/Button";
import { Link } from "react-router-dom";

interface IProps {
    username: string;
}

// function getInitials(name: string): string {
//     const initialsArr: string[] = name.split(' ');
//     if (initialsArr.length === 1) {
//         return initialsArr[0][0];
//     }
//     return initialsArr[0][0] + initialsArr[1][0];
// }

export const User = ({username}: IProps) => {
    return (
        <div className={styles.div}>
          <Link to={'/logout'}>
            <Button disabled={false} text={"Выход"} />
          </Link>
            <p>
                {username}
            </p>
        </div>
    );
}