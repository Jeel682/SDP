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
import { FirstPage } from "@material-ui/icons";
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
  const [description, setdescription] = useState("");
  const [city, setcity] = useState("");
  const [imageURL, setimageURL] = useState("");
  const [cost, setcost] = useState("");
  const [first,setfirst]= useState("");
 const [filtercity,setfiltercity]= useState("");
  const [second,setsecond]= useState("");
  
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
  const filterCart = () => {
    loadProducts();
   
  };
  const [show, setShow] = useState(false);

  //const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getProductsInCategory = () => {
    let tempfirst=0;
    let tempsecond=100000000;
    if(first!=="")
    {
      tempfirst = parseInt(first, 10 );
    }
    if(second!=="")
    {
      tempsecond = parseInt(second, 10 );
    }
    if(filtercity !="")
    {
      return products.filter((product) => product.category === category &&  parseInt(product.cost, 10 )   > tempfirst  &&  parseInt(product.cost, 10 )   < tempsecond && product.city === filtercity);  
    }
    else
    {
      return products.filter((product) => product.category === category &&  parseInt(product.cost, 10 )   > tempfirst  &&  parseInt(product.cost, 10 )   < tempsecond);
    }
    // if(first ==undefined  || first === 0 || first === "" &&  (second==="" || second=== undefined || second===0) )
    // {
    //   return products.filter((product) => product.category === category);
    // }
    // else if(first !== 0 && first !== "" && second == undefined  || second === 0 || second === "")
    // {
    //   return products.filter((product) => product.category === category &&  parseInt(product.cost, 10 )   > parseInt(first, 10 ));
    // }
    // else if(second !== 0 && second !== "" && first == undefined  || first === 0 || first === "")
    // {
    // return products.filter((product) => product.category === category && parseInt(product.cost, 10 )   < parseInt(second, 10 ));
    // }
    // else
    // {
    //   return products.filter((product) => product.category === category &&  parseInt(product.cost, 10 )   > parseInt(first, 10 ) &&  parseInt(product.cost, 10 )   < parseInt(second, 10 ));
    // }
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
      xhr.send(JSON.stringify(product));
      swal({
        title: "Product Deleted",
        icon: "success",
      });
    }
  };

  //const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);

  //const getProductsInCategory = () => {
   // return products.filter((product) => product.category === category);
  //};

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
        city: city,
        description: description,
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
        {customer === "admin" && (
          <Button
            variant="primary"
            onClick={handleShow}
            className="btn btn-danger float-right mt-0 btn-lg"
          >
            Insert Product
          </Button>
        )}

        <div className="products">
          <h4>{category} <div>
              Price Range : <input type={Text} placeholder='0'  onInput={(e) => setfirst(e.target.value)}  ></input> - <input  type={Text} placeholder='1000000'  onInput={(e) => setsecond(e.target.value)}></input>
              </div>
              <div>
              Enter City : <input type={Text} placeholder='Please add City Name'  onInput={(e) => setfiltercity(e.target.value)}  ></input> 
            </div>     
  </h4>
          {getProductsInCategory().map((product, idx) => (
            <Card
              style={{ width: "25rem", marginTop: 20, marginLeft: 30 }}
              key={idx}
            >
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Title>{product.city}</Card.Title>
                <para>{product.description}</para>
                <h4>₹{product.cost}</h4>
                <button
                  className="btn btn-success btn-lg"
                  onClick={() => addToCart(product)}
                >
                  Add to Package
                </button>

                {customer === "admin" && (
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
                  class="col-sm-2 col-form-label"
                  style={{ fontSize: 15, fontWeight: "bold" }}
                >
                  City
                </label>
                <div class="col-sm-10">
                  <input
                    type="email"
                    class="form-control"
                    id="inputEmail"
                    placeholder="Enter City"
                    value={city}
                    onInput={(e) => setcity(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div class="form-group row">
                <label
                  class="col-sm-2 col-form-label"
                  style={{ fontSize: 15, fontWeight: "bold" }}
                >
                  Description
                </label>
                <div class="col-sm-10">
                  <input
                    type="email"
                    class="form-control"
                    id="inputEmail"
                    placeholder="Enter Description"
                    value={description}
                    onInput={(e) => setdescription(e.target.value)}
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
