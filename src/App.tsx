import {createContext, useContext, useEffect, useState} from 'react';
import './App.css';

import {Registration} from "./pages/Registration";
import {Login} from "./pages/Login";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Header} from "./components/Header/Header";
import {ThemeProvider} from "./context/ThemeContext";
import {PostsProvider} from "./context/PostsContext";
import {AuthContext, AuthProvider} from "./context/AuthContext";
import {fbFetch} from "./fetch";
import {Test} from "./components/Test/Test";
import {Main} from "./pages/Main/Main";
import {MainProvider} from "./context/MainContext";
import {Logout} from "./pages/Logout";
import { Transactions } from './pages/Transactions/Transactions';
import {Index} from "./pages/Index/Index";

function App() {
  return (
    <AuthProvider>
      <PostsProvider>
        <ThemeProvider>
          <div className="App">
            <Router/>
          </div>
        </ThemeProvider>
      </PostsProvider>
    </AuthProvider>
  );
}

export const Router = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const getUser = async () => {
      const response = await fbFetch("http://family-budget.loc/api/auth/user", {});
      const data = await response.json();
      authContext.setUser(data);
    };

    getUser().then(r => []);
  }, []);
  return (
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route path="/" exact={true} component={Index}/>
        <Route path="/main/:user/:year/:month" exact={true} component={Main}/>
        <Route path="/transactions/:user/:year/:month" exact={true} component={Transactions}/>
        <Route path="/registration" exact={true} component={Registration}/>
        <Route path="/login" exact={true} component={Login}/>
        <Route path="/logout" exact={true} component={Logout}/>
        <Route path="/test" exact={true} component={Test}/>
        <Route
          path="/registration/success"
          exact={true}
          component={() => <h1>Успешно зарегистрирован</h1>}
        />
        <Route
          path="/auth/success"
          exact={true}
          component={() => <h1>Успешно авторизирован</h1>}
        />
        <Route component={() => <h1>404</h1>}/>
      </Switch>
    </BrowserRouter>
  );
};

export default App;

