import {createContext, ReactNode, useState} from "react";

export const Context = createContext<any>({});

interface IProps {
  children: ReactNode;
}

export const ThemeProvider = ({children}: IProps) => {
  const [isDark, setIsDark] = useState(true);

  return (
    <Context.Provider value={{isDark, setIsDark}}>
      {children}
    </Context.Provider>
  );
};
