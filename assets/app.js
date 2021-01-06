import React, { useState } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Switch, Route, withRouter } from "react-router-dom";
import "./styles/app.css";

import "./bootstrap";
import Navbar from "./js/components/NavBar";
import HomePage from "./js/pages/HomePage";
import CustomersPage from "./js/pages/CustomersPage";
import InvoicesPage from "./js/pages/InvoicesPage";
import LoginPage from "./js/pages/LoginPage";
import AuthAPI from "./js/services/authAPI";

AuthAPI.setup();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());

  const NavbarWithRouter = withRouter(Navbar);

  return (
    <HashRouter>
      <NavbarWithRouter isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated} />

      <main className="container pt-5">
        <Switch>
          <Route
            path="/login"
            render={(props) => <LoginPage onLogin={setIsAuthenticated} {...props} />}
          />
          <Route path="/invoices" component={InvoicesPage} />
          <Route path="/customers" component={CustomersPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </main>
    </HashRouter>
  );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);
