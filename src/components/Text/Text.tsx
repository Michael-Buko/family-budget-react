import styles from "./index.module.css"

interface IProps {
  label: string;
  placeholder: string;
  value?: string;
  setValue?: (value: string) => void;
  className?: string;
}

export const Text = ({label, placeholder, value, setValue, className}: IProps) => {
  return (
    <div className={`${styles.input} ${className}`}>
      <label>
        {label}
        <textarea
          value={value}
          onChange={(event) => {
            if (setValue) {
              setValue(event.target.value);
            }
          }}
          cols={70}
          rows={20}
        />
      </label>
    </div>
  );
};