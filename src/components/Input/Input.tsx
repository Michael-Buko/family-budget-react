import styles from "./index.module.css"

interface IProps {
    label: string;
    placeholder: string;
    value?: string;
    setValue?: (value: string) => void;
    className?: string;
}

export const Input = ({label, placeholder, value, setValue, className}: IProps) => {
    return (
        <div className={`${styles.input} ${className}`}>
            <label>
                {label}
                <input
                    value={value}
                    placeholder={placeholder}
                    onChange={(event) => {
                        if (setValue) {
                            setValue(event.target.value);
                        }
                    }}
                />
            </label>
        </div>
    );
};