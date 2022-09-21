import styles from "./index.module.css";
import {Modal} from "../Modal/Modal";
import {useEffect, useState} from "react";
import {Title} from "../Title/Title";
import {Input} from "../Input/Input";
import {Button} from "../Button";
import {Text} from "../Text/Text";
import {useHistory} from "react-router-dom";


interface IProps {
  id: number,
  isModal: boolean,
  setIsModal: (val: boolean) => void;
}


export const ModalEditBlog = ({id, isModal, setIsModal}: IProps) => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blog, setBlog] = useState('');
  const history = useHistory();
  const [error, setError] = useState("");
  const token = localStorage.getItem('token');

  if (id && !title) {
    const promise = fetch(`http://family-budget.loc/api/blog/${id}`, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    });
    promise
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setTitle(data?.blog.title);
        setContent(data?.blog.content);
      });
  }

  const onClickEditBlog = () => {
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

    const promise = fetch(`http://family-budget.loc/api/blog/${id}`, {
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
            <Title text="Редактирование статьи"/>
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
              <p style={{color: "red"}}>{id}</p>
              <Button text="Сохранить изменения" onClick={onClickEditBlog} type="primary" disabled={false}/>
            </div>
          </Modal>
        </div>
        :
        null
      }
    </>
  );


}