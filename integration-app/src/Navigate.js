import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, NavLink } from "react-router-dom";
import Route from "react-router-dom/Route";
import Home from "./Home";
import Portfolio from "./Portfolio";
import Registration from "./Registration";
import Login from "./Login";
import Item from "./Item";
function Navigate() {
  return (
    <div>
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/portfolio" exact component={Portfolio} />
        <Route path="/Home" exact component={Home} />
        <Route path="/Registration" exact component={Registration} />
        <Route path="/Login" exact component={Login} />
        <Route path="/Item" exact component={Item} />
      </Router>
    </div>
  );
}

export default Navigate;
