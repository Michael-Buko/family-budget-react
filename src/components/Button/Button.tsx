import styles from "./index.module.css";

interface IProps {
    text: string;
    disabled: boolean;
    type?: "primary" | "secondary" | "close" | "find";
    onClick?: () => void;
    className?: string;
}

export const Button = ({disabled, type, text, onClick, className}: IProps) => {
    return <button
        disabled={disabled}
        className={`${styles.button}  ${type ? styles[type] : styles.primary} ${disabled ? styles.disabled : ""} ${className}`}
        onClick={onClick}
    >
        {text}
    </button>
}
