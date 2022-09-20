import {createContext, ReactNode, useEffect, useState} from "react";

interface IProps {
  children: ReactNode;
}

export const PostsContext = createContext<any>({});

export const PostsProvider = ({children}: IProps) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const promise = fetch("https://studapi.teachmeskills.by/blog/posts/?limit=100");

    promise
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setPosts(data?.results);
      });
  }, []);

  return <PostsContext.Provider value={{posts}}>{children}</PostsContext.Provider>;
};
