import React, { useState, useRef } from "react";
import Card from "react-bootstrap/Card";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import swal from "sweetalert";
import "./App.css";
import * as actions from "./actions/actions";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/form";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
const PHOTOS_VIDEO = "Photo & Video";
const BRIDAL = "Bridal Wear";
const MAKEUP = "Makeup";
const DESTINATION = "Destination";
const GROOM = "Groom Wear";
const responseGoogle = (response) => {
  console.log(response);
};
function Products({
  setCart,
  cart,
  category,
  customer,
  products,
  setproducts,
}) {
  const [name, setname] = useState("");
  const [imageURL, setimageURL] = useState("");
  const [cost, setcost] = useState("");

  const addToCart = (product) => {
    if (customer === "") {
      alert("Please Log In first");
    } else {
      let newCart = [...cart];
      let itemInCart = newCart.find((item) => product.name === item.name);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        itemInCart = {
          ...product,
          quantity: 1,
        };
        newCart.push(itemInCart);
      }
      setCart(newCart);
      swal({
        title: "Package Added",
        icon: "success",
      });
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getProductsInCategory = () => {
    return products.filter((product) => product.category === category);
  };
  const deletefromdb = (product) => {
    if (customer === "") {
      alert("Please Log In first");
    } else {
      var xhr = new XMLHttpRequest();
      xhr.open("DELETE", "http://localhost:8080/deleteproduct");
      // send the request
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      let obj = {
        _id: product._id,
      };
      setproducts(products.filter((item) => item._id !== product._id));
      xhr.send(JSON.stringify(obj));
      swal({
        title: "Product Deleted",
        icon: "success",
      });
    }
  };

  const save = () => {
    if (validate()) {
      var xhr = new XMLHttpRequest();
      // get a callback when the server responds
      // xhr.addEventListener('load', () => {
      //   // update the state of the component with the result here
      //   console.log(xhr.responseText)
      // })
      // open the request with the verb and the url
      xhr.open("POST", "http://localhost:8080/insertproduct");
      // send the request
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      let obj = {
        category: category,
        name: name,
        cost: cost,
        image: imageURL,
      };

      let newproducts = [...products];

      newproducts.push(obj);
      setproducts(newproducts);
      xhr.send(JSON.stringify(obj));

      handleClose();
    }
  };

  const validate = () => {
    let isValid = true;

    if (!name) {
      alert("Invalid Name");
      return false;
    }

    if (!cost) {
      alert("Invalid cost");
      return false;
    }

    if (!imageURL) {
      alert("Invalid Image URL");
      return false;
    }
    return isValid;
  };

  return (
    <>
      {/* <div id="select">
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value={PHOTOS_VIDEO}>{PHOTOS_VIDEO}</option>
          <option value={BRIDAL}>{BRIDAL}</option>
          <option value={MAKEUP}>{MAKEUP}</option>
          <option value={DESTINATION}>{DESTINATION}</option>
          <option value={GROOM}>{GROOM}</option>
        </select>
      </div> */}
      <div>
        {/* <button
          className="btn btn-danger float-right mt-0 btn-lg"
          onClick={showPopup}
        >
          Insert Product
        </button> */}
        {customer === "Test1" &&  (<Button
          variant="primary"
          onClick={handleShow}
          className="btn btn-danger float-right mt-0 btn-lg"
        >
          Insert Product
        
        </Button>)}

        <div className="products">
          {getProductsInCategory().map((product, idx) => (
            <Card
              style={{ width: "25rem", marginTop: 20, marginLeft: 30 }}
              key={idx}
            >
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>

                <h4>₹{product.cost}</h4>
                <button
                  className="btn btn-success btn-lg"
                  onClick={() => addToCart(product)}
                >
                  Add to Package
                </button>
                
               

                {customer === "Test1" && (
                  <button
                    className="btn btn-danger float-right mt-0 btn-lg"
                    onClick={() => deletefromdb(product)}
                  >
                    Delete
                  </button>
                )}


              </Card.Body>
            </Card>
          ))}

          <div></div>
        </div>

        {/* <Modal show={status} onHide={closePopup} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>
              <h1>Add Product</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div class="form-group row">
                <label
                  class="col-sm-2 col-form-label"
                  style={{ fontSize: 15, fontWeight: "bold" }}
                >
                  Name
                </label>
                <div class="col-sm-10">
                  <input
                    type="email"
                    class="form-control"
                    id="inputEmail"
                    placeholder="Enter Name"
                    ref="name"
                    required
                  />
                </div>
              </div>

              <div class="form-group row">
                <label
                  for="inputEmail"
                  class="col-sm-2 col-form-label"
                  style={{ fontSize: 15, fontWeight: "bold" }}
                >
                  Cost
                </label>
                <div class="col-sm-10">
                  <input
                    type="email"
                    class="form-control"
                    id="inputEmail"
                    placeholder="Enter City"
                    ref="cost"
                    required
                  />
                </div>
              </div>

              <div class="form-group row">
                <label
                  for="inputEmail"
                  class="col-sm-2 col-form-label"
                  style={{ fontSize: 15, fontWeight: "bold" }}
                >
                  Image URL
                </label>
                <div class="col-sm-10">
                  <input
                    type="email"
                    class="form-control"
                    id="inputEmail"
                    placeholder="Enter Partner Name"
                    ref="imageURL"
                    required
                  />
                </div>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              className="btm btn-block"
              onClick={() => {
                save();
              }}
            >
              Ok
            </Button>
          </Modal.Footer>
        </Modal> */}

        <Modal show={show} onHide={handleClose} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div class="form-group row">
                <label
                  class="col-sm-2 col-form-label"
                  style={{ fontSize: 15, fontWeight: "bold" }}
                >
                  Name
                </label>
                <div class="col-sm-10">
                  <input
                    type="email"
                    id="inputEmail"
                    placeholder="Enter Name"
                    value={name}
                    onInput={(e) => setname(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div class="form-group row">
                <label
                  for="inputEmail"
                  class="col-sm-2 col-form-label"
                  style={{ fontSize: 15, fontWeight: "bold" }}
                >
                  Cost
                </label>
                <div class="col-sm-10">
                  <input
                    type="email"
                    class="form-control"
                    id="inputEmail"
                    placeholder="Enter Cost"
                    value={cost}
                    onInput={(e) => setcost(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div class="form-group row">
                <label
                  for="inputEmail"
                  class="col-sm-2 col-form-label"
                  style={{ fontSize: 15, fontWeight: "bold" }}
                >
                  Image URL
                </label>
                <div class="col-sm-10">
                  <input
                    type="email"
                    class="form-control"
                    id="inputEmail"
                    placeholder="Enter Image URL"
                    value={imageURL}
                    onInput={(e) => setimageURL(e.target.value)}
                    required
                  />
                </div>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={save}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

const receive = (state) => {
  if (state.hasOwnProperty("status")) {
    if (state.status.update === "success") {
      state.data.forEach((element, index) => {
        if (element.p_id == state.status.record.p_id) {
          element.p_name = state.status.record.p_name;
          element.p_cost = state.status.record.p_cost;
        }
      });
    }

    if (state.status.delete === "success") {
      let id = state.data.findIndex((element, index) => {
        return element.p_id === state.status.p_id;
      });
      state.data.splice(id, 1);
    }
    if (state.status.insert === "success") {
      state.data.push(state.status.record);
      swal({
        title: "Insert Success",
        icon: "success",
      });
    }
  }

  return {
    data: state.data,
    status: state.status,
  };
};

const send = (dispatch) => {
  return {
    getProducts: () => {
      dispatch(actions.getProducts());
    },

    addNewProduct: (record) => {
      dispatch(actions.addNewProduct(record));
    },
  };
};
export default connect(receive, send)(Products);
