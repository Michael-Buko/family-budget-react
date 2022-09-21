import styles from "./index.module.css";
import {useEffect, useState} from "react";
import {IBlog} from "../../types/blog";
import {Button} from "../../components/Button";
import {ModalAddBlog} from "../../components/ModalAddBlog/ModalAddBlog";
import {Modal} from "../../components/Modal/Modal";
import {Title} from "../../components/Title/Title";
import {ModalEditBlog} from "../../components/ModalEditBlog/ModalEditBlog";

export const Admin = () => {


  const [blog, setBlog] = useState([]);
  const [isModalAddBlog, setIsModalAddBlog] = useState(false);
  const [isModalEditBlog, setIsModalEditBlog] = useState(false);
  const [isOkModalShowed, setIsOkModalShowed] = useState(false);
  const [idBlog, setIdBlog] = useState(0);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const promise = fetch(`http://family-budget.loc/api/blog`, {
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
        setBlog(data?.blog);
      });
  }, []);


  const removeBlog = (id: number) => {
    const promise = fetch(`http://family-budget.loc/api/blog/${id}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
    });
    promise
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data?.message?.includes("Article delete")) {
          setIsOkModalShowed(true);
        }
      })
  };

  const editBlog = (id: number) => {
    setIdBlog(id);
    setIsModalEditBlog(true);
  };


  return (


    <div className={styles.main}>
      <Button text={"Добавить статью"} disabled={false} onClick={() => setIsModalAddBlog(true)}/>
      {
        blog.map(({id, title, content}: IBlog) => {
          const removeWithId = () => removeBlog(id)
          const editWithId = () => editBlog(id)
          return (
            <div key={id} className={styles.post}>
              <div className={styles.title}>{title}</div>
              <div className={styles.button}>
                <Button text={"Редактировать"} disabled={false} onClick={() => editWithId()}/>
                <Button text={"Удалить"} disabled={false} onClick={removeWithId}/>
              </div>
            </div>
          )
        })
      }
      {/*  ////////////////////////////////*/}

      <ModalAddBlog isModal={isModalAddBlog} setIsModal={() => setIsModalAddBlog(false)}/>

      <ModalEditBlog id={idBlog} isModal={isModalEditBlog} setIsModal={() => setIsModalEditBlog(false)}/>

      {/*//////////////////////////////////*/}
      {isOkModalShowed ? (
        <Modal onClose={() => setIsOkModalShowed(false)}>
          <div className={`${styles.container} `}>
            <Title text="Удаление статьи"/>
            <div className={`${styles.regAndLog}`}>
              <p style={{color: "red"}}>{"Статья удалена"}</p>
              <Button text="Ok" onClick={() => setIsOkModalShowed(false)} type="primary" disabled={false}/>
            </div>
          </div>
        </Modal>
      ) : ''}
    </div>


  );
}