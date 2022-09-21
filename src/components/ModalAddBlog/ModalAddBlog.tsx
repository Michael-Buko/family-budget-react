import styles from "./index.module.css";
import {Modal} from "../Modal/Modal";
import {useState} from "react";
import {Title} from "../Title/Title";
import {Input} from "../Input/Input";
import {Button} from "../Button";
import {Text} from "../Text/Text";
import {useHistory} from "react-router-dom";


interface IProps {
  isModal: boolean,
  setIsModal: (val: boolean) => void;
}


export const ModalAddBlog = ({isModal, setIsModal}: IProps) => {


  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const history = useHistory();
  const [error, setError] = useState("");
  const token = localStorage.getItem('token');


  const onClickAddBlog = () => {
    if (title.trim() === "") {
      setError("Введите заголовок");
      return;
    } else {
      setError("");
    }

    if (content.trim() === "") {
      setError("Статья не может быть пустой");
      return;
    } else {
      setError("");
    }

    const promise = fetch("http://family-budget.loc/api/blog", {
      method: "POST",
      headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
      body: JSON.stringify({title: title, content: content}),
    });

    promise
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data?.email?.includes("user with this Email already exists.")) {
          setError("Пользователь с таким email существует");
          return;
        }

        if (data?.username?.includes("A user with that username already exists.")) {
          setError("Пользователь с таким именем уже существует");
          return;
        }

        if (data?.password?.includes("This password is too common.")) {
          setError("Пороль слишком простой");
          return;
        }

        window.location.reload();
        setIsModal(false);
        setTitle("");
        setContent("");
        // setIsRegOkModalShowed(true);

      });
  };


  return (
    <>
      {isModal
        ?
        <div className={styles.container}>
          <Modal onClose={() => setIsModal(isModal)}>
            <Title text="Добавление статьи"/>
            <div className={`${styles.addBlog}`}>
              <Input
                className={styles.input}
                value={title}
                setValue={setTitle}
                label={"Название статьи"}
                placeholder="Название статьи"/>
              <Text
                value={content}
                setValue={setContent}
                label={"Текст статьи"}
                placeholder="email"
              />
              <p style={{color: "red"}}>{error}</p>
              <Button text="Добавить статью" onClick={onClickAddBlog} type="primary" disabled={false}/>
            </div>
          </Modal>
        </div>
        :
        null
      }
    </>
  )


}