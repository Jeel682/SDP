import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, NavLink } from "react-router-dom";
import Route from "react-router-dom/Route";
import Home from "./Home";
import Portfolio from "./Portfolio";
import Photos from "./Photos";
import CreatePackage from "./CreatePackage";
import Makeup from "./Makeup";
import Destination from "./Destination";
import Bridal from "./Bridal";
import Groom from "./Groom";
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
        <Route path="/Photos" exact component={Photos} />
        <Route path="/Makeup" exact component={Makeup} />
        <Route path="/Destination" exact component={Destination} />
        <Route path="/Bridal" exact component={Bridal} />
        <Route path="/Groom" exact component={Groom} />
        <Route path="/Registration" exact component={Registration} />
        <Route path="/Login" exact component={Login} />
        <Route path="/Item" exact component={Item} />
      </Router>
    </div>
  );
}

export default Navigate;
