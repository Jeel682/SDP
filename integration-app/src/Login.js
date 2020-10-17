import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import axios from "axios";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import swal from "sweetalert";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
const PAGE_HOME = "HomeContent";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      customer: props.customer,
      setcustomer: props.setcustomer,
      setPage: props.setPage,
    };
  }
  signin = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8080/login", this.state).then(
      (posRes) => {
        if (posRes.data.login == "success") {
          this.state.setcustomer(posRes.data.customername);
          this.state.setPage(PAGE_HOME);
        } else {
          swal({
            title: "Login Fail",
            icon: "warning",
          });
        }
      },
      (errRes) => {}
    );
  };
  getData = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  googleResponse = (response) => {
    this.props.history.push("/app");
  };
  render() {
    return (
      <div id="pic" id="login">
        <Container maxWidth="xs" fluid>
          <Card
            shadow
            style={{ minWidth: 250, borderRadius: 10 }}
            className="mt-5"
          >
            <CardContent>
              <Typography style={{ fontSize: 14 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: 8,
                    marginTop: 10,
                  }}
                >
                  <Avatar style={{ backgroundColor: "red" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography variant="h5">Sign In</Typography>

                  <form
                    style={{
                      width: "100%",
                      marginTop: 1,
                    }}
                    noValidate
                  >
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      label="Email"
                      autoFocus
                      name="email"
                      onChange={this.getData}
                    />

                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      name="password"
                      onChange={this.getData}
                    />
                    <Button
                      style={{ marginTop: 15 }}
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={this.signin}
                    >
                      Sign In
                    </Button>

                    <Button
                      style={{ marginTop: 15 }}
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="red"
                      onClick={this.forgotpassword}
                    >
                      Forgot Password
                    </Button>

                    <Button
                      style={{ marginTop: 15 }}
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="blue"
                      onClick={() => {
                        this.showPopup("insert");
                      }}
                    >
                      Register
                    </Button>

                    <div style={{ marginTop: 10, marginLeft: 90 }}></div>
                  </form>
                </div>
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </Container>
      </div>
    );
  }
}
export default Login;
