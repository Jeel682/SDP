import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Route from "react-router-dom/Route";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { browserHistory } from "react-router-dom";
import "./App.css";
import "./Home.css";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Card from "react-bootstrap/Card";
import { useHistory } from "react-router-dom";
import HomeContent from "./HomeContent";
import Portfolio from "./Portfolio";
import Login from "./Login";
import Typography from "@material-ui/core/Typography";
import Products from "./Products";
import Cart from "./Cart";
const PAGE_PRODUCTS = "products";
const PAGE_CART = "cart";
const PAGE_HOME = "HomeContent";
const PAGE_PORTFOLIO = "Portfolio";
const PAGE_LOGIN = "Login";
const PHOTOS_VIDEO = "Photo & Video";
const BRIDAL = "Bridal Wear";
const MAKEUP = "Makeup";
const DESTINATION = "Destination";
const GROOM = "Groom Wear";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: 750,
  },
}));

function Home() {
  let history = useHistory();

  const [products, setproducts] = useState([]);

  let portFolioPage = () => {
    history.push("/Portfolio");
  };

  let photos = () => {
    setCategory(PHOTOS_VIDEO);
    loadProducts();
    navigateTo(PAGE_PRODUCTS);
  };

  let makeup = () => {
    setCategory(MAKEUP);
    loadProducts();
    navigateTo(PAGE_PRODUCTS);
  };
  let destination = () => {
    setCategory(DESTINATION);
    loadProducts();
    navigateTo(PAGE_PRODUCTS);
  };

  let bridal = () => {
    setCategory(BRIDAL);
    loadProducts();
    navigateTo(PAGE_PRODUCTS);
  };

  let groom = () => {
    setCategory(GROOM);
    loadProducts();
    navigateTo(PAGE_PRODUCTS);
  };

  let registration = () => {
    history.push("/Registration");
  };

  let home = () => {
    history.push("/Home");
  };

  let item = () => {
    history.push("/Item");
  };

  let loadProducts = () => {
    var xhr = new XMLHttpRequest();
    // get a callback when the server responds
    xhr.addEventListener("load", () => {
      // update the state of the component with the result here
      console.log(xhr.responseText);
      setproducts(JSON.parse(xhr.responseText));
    });
    // open the request with the verb and the url
    xhr.open("Get", "http://localhost:8080/fetch");
    xhr.send();
  };

  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState([]);
  const [page, setPage] = useState(PAGE_HOME);
  const [customer, setcustomer] = useState("");

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  return (
    <div>
      {/* NavBar Starts */}
      <Navbar expand="lg" className="navbar">
        <img src={require("./img/logo1.png")} className="img" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" style={{ marginLeft: 50 }}>
            <Nav.Link onClick={() => navigateTo(PAGE_HOME)}>HOME</Nav.Link>

            <NavDropdown
              title="SERVICES"
              id="basic-nav-dropdown"
              style={{ marginLeft: 50 }}
            >
              <NavDropdown.Item
                onClick={(e) => {
                  photos();
                }}
                className="bg-dark text-white"
              >
                Photographer
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={(e) => {
                  makeup();
                }}
                className="bg-dark text-white"
              >
                Makeup
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={(e) => {
                  destination();
                }}
                className="bg-dark text-white"
              >
                Destination
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={(e) => {
                  bridal();
                }}
                className="bg-dark text-white"
              >
                Bridal Wear
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={(e) => {
                  groom();
                }}
                className="bg-dark text-white"
              >
                Groom Wear
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link
              style={{ marginLeft: 50 }}
              onClick={() => navigateTo(PAGE_PORTFOLIO)}
            >
              PORTFOLIO
            </Nav.Link>
          </Nav>

          

          {customer !== "" && (
            <Typography variant="h5">Hello {customer}</Typography>
          )}

          {customer === "" && (
            <Form inline>
              <Button
                variant="outline-success"
                onClick={(e) => {
                  registration();
                }}
                style={{ marginRight: 50 }}
              >
                Register
              </Button>

              <Button
                variant="outline-success"
                style={{ marginRight: 50 }}
                onClick={() => navigateTo(PAGE_LOGIN)}
              >
                LOGIN
              </Button>
            </Form>
          )}
          {customer !== "" && (
            <Form inline>
              <Typography variant="h5"></Typography>
              <Button
                variant="outline-success"
                onClick={(e) => {
                  setcustomer("");
                }}
                style={{ marginRight: 50, marginLeft: 20 }}
              >
                Logout
              </Button>
            </Form>
          )}
        </Navbar.Collapse>
      </Navbar>
      {/* NavBar Ends */}
      {page === PAGE_HOME && <HomeContent />}
      {page === PAGE_PORTFOLIO && <Portfolio />}
      {page === PAGE_LOGIN && (
        <Login
          customer={customer}
          setcustomer={setcustomer}
          setPage={setPage}
        />
      )}
      {page === PAGE_PRODUCTS && (
        <Products
          cart={cart}
          setCart={setCart}
          category={category}
          customer={customer}
          products={products}
          setproducts={setproducts}
        />
      )}
      {page === PAGE_CART && <Cart cart={cart} setCart={setCart} />}
      {page === PAGE_HOME && (
        <div class="container">
          <div class="row">
            <div class="col-sm-4">
              <img
                src={require("./img/camera.png")}
                onClick={(e) => {
                  photos();
                }}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div class="col-sm-4 mt-5">
              <img
                src={require("./img/makeup.png")}
                onClick={(e) => {
                  makeup();
                }}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div class="col-sm-4 mt-3">
              <img
                src={require("./img/destination.png")}
                onClick={(e) => {
                  destination();
                }}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
      )}
      {page === PAGE_HOME && (
        <div class="container">
          <div class="row">
            <div class="col-sm-4 mt-5">
              <img
                src={require("./img/bridal.png")}
                onClick={(e) => {
                  bridal();
                }}
                style={{ cursor: "pointer" }}
              />
            </div>

            <div class="col-sm-4 mt-4">
              <img
                src={require("./img/groom.png")}
                onClick={(e) => {
                  groom();
                }}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div class="col-sm-4 mt-4">
              <img
                src={require("./img/package.png")}
                onClick={() => navigateTo(PAGE_CART)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
