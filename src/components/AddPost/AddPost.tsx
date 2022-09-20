import { useState } from "react";

import styles from "./index.module.css";

import { Title } from "../Title/Title";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { fbFetch } from "../../fetch";

export const AddPost = () => {
  const [title, setTitle] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<Blob | null>(null);

  const onLoad = (event: any) => {
    setImageFile(event.target.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (event: any) => {
      setImage(event.target.result);
    };
  };

  const removeImage = () => {
    setImage("");
    setImageFile(null);
  };

  const createNewPost = () => {
    const formData = new FormData();

    if (imageFile) {
      formData.append("image", imageFile);
    }

    formData.append("text", text);
    formData.append("lesson_num", String(number));
    formData.append("title", title);

    fbFetch("https://studapi.teachmeskills.by/blog/posts/", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
      },
      body: formData,
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Title text="Add new post" />

      <Input label="Title" placeholder="Title" value={title} setValue={(text) => setTitle(text)} />
      <Input
        label="Lesson number"
        value={number}
        placeholder={"Lesson number"}
        setValue={(text) => setNumber(text)}
      />
      <textarea value={text} onChange={(event) => setText(event.target.value)} />

      <div>
        {image ? (
          <>
            <img src={image} />
            <Button text="remove image" onClick={removeImage} disabled={false} />
          </>
        ) : (
          <p>Image</p>
        )}

        {image ? null : (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={onLoad}
              style={{
                width: "100%",
                height: "100%",
                zIndex: 100,
              }}
            />
          </>
        )}
      </div>

      <Button text="Add post" onClick={createNewPost} disabled={false}></Button>
    </div>
  );
};
