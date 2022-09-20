import styles from "./index.module.css";
import {Title} from "../components/Title/Title";
import {Context} from "../context/ThemeContext";
import {useContext} from "react";
import {Input} from "../components/Input/Input";
import {Button} from "../components/Button/Button";

export const AddPost = () => {
    const context = useContext(Context);
    const {isDark} = context;
    return (
        <div className={`${styles.container} ${isDark ? styles.darkContainer : ""}`}>
            <Title text="Add new post"/>
            <div style={{display: "flex"}}
            >
                <div className={`${styles.regAndLog}`} style={{border: "0px"}}>
                    <Input
                        value={""}
                        setValue={() => {
                        }}
                        label={"Title"}
                        placeholder="title"
                    />
                    <Input
                        value={""}
                        setValue={() => {
                        }}
                        label="Lesson number"
                        placeholder="lesson number"
                    />
                    <Input
                        value={""}
                        setValue={() => {
                        }}
                        label={"Text"}
                        placeholder="text"
                    />
                </div>
                <div className={`${styles.regAndLog}`} style={{border: "0px"}}>
                    <p>Image</p>
                    <Button text="Add" onClick={() => {
                    }} type="secondary" disabled={false}/>
                </div>
            </div>
                <Button text="Add" onClick={() => {
                }} type="primary" disabled={false}/>
        </div>
    );
}