import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./actions/actions";
import "./App.css";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/form";
import Modal from "react-bootstrap/Modal";
import swal from "sweetalert";
import Nav from "react-bootstrap/Nav";
import { useHistory } from "react-router-dom";
const responseGoogle = (response) => {
  console.log(response);
};

class Registration extends React.Component {
  constructor() {
    super();
    this.state = {
      status: false,
      updatePopup: false,
      insertPopup: false,
    };
  }

  componentDidMount() {
    this.props.getProducts();
  }

  showPopup = (msg) => {
    if (msg === "update") {
      this.setState({
        status: true,
        updatePopup: true,
        insertPopup: false,
      });
    }

    if (msg === "insert") {
      this.setState({
        status: true,
        insertPopup: true,
        updatePopup: false,
      });
    }
  };
  deleteProduct = (p_id) => {
    this.props.deleteProduct(p_id);
  };

  closePopup = () => {
    this.setState({
      status: false,
      insertPopup: false,
      updatePopup: false,
    });
  };

  save = () => {
    if (this.state.updatePopup) {
      this.props.updateProduct({
        p_id: this.refs.p_id.value,
        p_name: this.refs.p_name.value,
        p_cost: this.refs.p_cost.value,
      });
    } else if (this.state.insertPopup) {
      if (this.validate()) {
        this.props.addProduct({
          name: this.refs.name.value,
          email: this.refs.email.value,
          password: this.refs.password.value,
          gender: this.refs.male.value,
          gender: this.refs.female.value,
          city: this.refs.city.value,
          partnername: this.refs.partnername.value,
          mobileno: this.refs.mobileno.value,
          budget: this.refs.budget.value,
          weddingdate: this.refs.weddingdate.value,
        });
        this.closePopup();
      }
    }
  };

  validate() {
    let isValid = true;

    if (!this.refs.name.value) {
      alert("Invalid Name");
      return false;
    }

    if (!this.refs.email.value) {
      alert("Invalid email");
      return false;
    }

    if (this.refs.email.value !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(this.refs.email.value)) {
        alert("Invalid email");
        return false;
      }
    }

    if (!this.refs.city.value) {
      alert("Invalid City");
      return false;
    }

    if (!this.refs.mobileno.value) {
      alert("Invalid Mobile");
      return false;
    }

    if (!this.refs.budget.value) {
      alert("Invalid Budget");
      return false;
    }

    if (!this.refs.weddingdate.value) {
      alert("Invalid Wedding Date");
      return false;
    }

    return isValid;
  }

  render() {
    return (
      <Container fluid id="pic">
        <img src={require("./img/logo1.png")} className="img" />
        <Nav.Link
          href="/Home"
          style={{ display: "inline", color: "black", fontSize: 20 }}
        >
          HOME
        </Nav.Link>
        <Button
          className="mt-4 btn-lg btn-success float-right"
          style={{ fontSize: 25 }}
          onClick={() => {
            this.showPopup("insert");
          }}
        >
          Register Here
        </Button>

        <Modal
          show={this.state.status}
          onHide={this.closePopup}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h1>Register</h1>
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
                  Email
                </label>
                <div class="col-sm-10">
                  <input
                    type="email"
                    class="form-control"
                    id="inputEmail"
                    placeholder="Enter Email"
                    ref="email"
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
                  Password
                </label>
                <div class="col-sm-10">
                  <input
                    type="password"
                    class="form-control"
                    id="inputEmail"
                    placeholder="Enter Password"
                    ref="password"
                    required
                  />
                </div>
              </div>

              <div class="form-group row">
                <Form.Label
                  style={{ fontSize: 15, fontWeight: "bold" }}
                  class="col-sm-2 col-form-label"
                >
                  Gender
                </Form.Label>
                <br />
                <div class="col-sm-10">
                  <input
                    type="radio"
                    name="gen"
                    value="male"
                    ref="male"
                    required
                  />{" "}
                  Male &nbsp; &nbsp;
                  <input
                    type="radio"
                    name="gen"
                    value="male"
                    ref="female"
                    required
                  />{" "}
                  Female
                </div>
              </div>

              <div class="form-group row">
                <label
                  for="inputEmail"
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
                    ref="city"
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
                  Partner Name
                </label>
                <div class="col-sm-10">
                  <input
                    type="email"
                    class="form-control"
                    id="inputEmail"
                    placeholder="Enter Partner Name"
                    ref="partnername"
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
                  Mobile No
                </label>
                <div class="col-sm-10">
                  <input
                    type="number"
                    class="form-control"
                    id="inputEmail"
                    placeholder="Enter Mobile Number"
                    ref="mobileno"
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
                  Budget
                </label>
                <div class="col-sm-10">
                  <input
                    type="number"
                    class="form-control"
                    id="inputEmail"
                    placeholder="Enter Budget"
                    ref="budget"
                    required
                  />
                </div>
              </div>

              <div class="form-group row">
                <Form.Label
                  style={{ fontSize: 15, fontWeight: "bold" }}
                  class="col-sm-2 col-form-label"
                >
                  Enter Wedding Date
                </Form.Label>
                <div class="col-sm-10">
                  <input
                    type="date"
                    ref="weddingdate"
                    required
                    min="2020-10-16"
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
                this.save();
              }}
            >
              Register
            </Button>
          </Modal.Footer>
        </Modal>
        <div class="col-md-6" style={{ marginTop: 50 }}>
          <img src={require("./img/group.png")} />
        </div>
      </Container>
    );
  }
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
        title: "Registration Success",
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
    deleteProduct: (id) => {
      dispatch(actions.deleteProduct({ p_id: id }));
    },
    addProduct: (record) => {
      dispatch(actions.addProduct(record));
    },
    updateProduct: (record) => {
      dispatch(actions.updateProduct(record));
    },
  };
};
export default connect(receive, send)(Registration);
