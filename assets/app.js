import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import "./styles/app.css";

import "./bootstrap";
import Navbar from "./js/components/NavBar";
import HomePage from "./js/pages/HomePage";
import CustomersPage from "./js/pages/CustomersPage";
import InvoicesPage from "./js/pages/InvoicesPage";
import LoginPage from "./js/pages/LoginPage";
import AuthAPI from "./js/services/authAPI";
import AuthContext from "./js/contexts/AuthContext";
import PrivateRoute from './js/components/PrivateRoute';

AuthAPI.setup();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthAPI.isAuthenticated()
  );

  const NavbarWithRouter = withRouter(Navbar);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
    }}>
      <HashRouter>
        <NavbarWithRouter />

        <main className="container pt-5">
          <Switch>
            <Route path="/login" component={LoginPage} />
            <PrivateRoute path="/invoices" component={InvoicesPage} />
            <PrivateRoute path="/customers" component={CustomersPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </main>
      </HashRouter>
    </AuthContext.Provider>
  );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);
