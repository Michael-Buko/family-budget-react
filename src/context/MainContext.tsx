import {createContext, ReactNode, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { IPrimaryData } from "../types/primaryData";
import {ISummary} from "../types/summary";
import {ITransaction} from "../types/transaction";

interface IProps {
  children: ReactNode;
}



export const MainContext = createContext<any>({});
//   <{
//   setUser: (user: string) => void;
//   setYear: (user: string) => void;
//   setMonth: (user: string) => void;
//   primaryData: IPrimaryData[] | null;
//   summary: ISummary[] | null;
//   transaction: ITransaction[] | null;
// }>({
//   setUser: (value: string) => {},
//   setYear: (value: string) => {},
//   setMonth: (value: string) => {},
//   primaryData: null,
//   summary: null,
//   transaction: null
// });

export const MainProvider = ({children}: IProps) => {

  // const {user} = useParams<{ user: string }>();
  // const {year} = useParams<{ year: string }>();
  // const {month} = useParams<{ month: string }>();


  const [user, setUser] = useState("2");
  const [year, setYear] = useState("2022");
  const [month, setMonth] = useState("8");

  const [primaryData, setPrimaryData] = useState([]);
  const [summary, setSummary] = useState([]);
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    const promise = fetch(`http://family-budget.loc/api/main?user=${user}&year=${year}&month=${month}`);
    promise
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setPrimaryData(data?.primaryData);
        setSummary(data?.summary);
        setTransaction(data?.transaction)
      });
  }, []);

  return <MainContext.Provider value={{setUser, setYear, setMonth, primaryData, summary, transaction}}>{children}</MainContext.Provider>;
};
