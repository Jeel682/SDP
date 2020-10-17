import React from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Card from "react-bootstrap/Card";
import "./App.css";
import "./Home.css";
import { useHistory } from "react-router-dom";

function Portfolio() {
  return (
    <div>
      <div class="text-center">
        <img src={require("./img/img_1 (1).png")} />
      </div>
      <div class="text-center mt-5">
        <img src={require("./img/img_1 (2).png")} />
      </div>
      <div class="text-center mt-5">
        <img src={require("./img/img_1 (3).png")} />
      </div>
    </div>
  );
}

export default Portfolio;
