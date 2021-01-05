import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Switch, Route } from "react-router-dom";
import "./styles/app.css";

import "./bootstrap";
import Navbar from "./js/components/NavBar";
import HomePage from "./js/pages/HomePage";
import CustomersPage from './js/pages/CustomersPage';

const App = () => {
  return (
    <HashRouter>
      <Navbar />

      <main className="container pt-5">
          <Switch>
              <Route path="/customers" component={CustomersPage} />
              <Route path="/" component={HomePage} />
          </Switch>
      </main>
    </HashRouter>
  );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);
