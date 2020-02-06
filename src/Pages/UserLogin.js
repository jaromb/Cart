import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { PrimaryBlue, PrimaryOrange } from "../Components/Colors";
import { PrimaryButton, Row } from "../Components/StyledComponents"

class UserLogin extends Component {
  state = {
    user: "",
    password: "",
    returnedUser: null,
    error: null
  };

  async componentDidMount() {
    const returnedUser = await sessionStorage.getItem("user");
    this.setState({
      returnedUser: returnedUser
    });
  }

  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      error: null
    });
  };

  handleEnter = () => e => {
    if (e.key === "Enter") {
      this.authenticate(this.state.user, this.state.password)
        .then(response => {
          sessionStorage.setItem("user", response.result.username);
          this.setState({
            returnedUser: response.result.username
          });
        })
        .catch();
    }
  };

  authenticate = (user, password) =>
    new Promise((resolve, reject) => {
      console.log("user = " + user + " password =" + password);
      fetch("https://my-helio-cart-api.herokuapp.com/user/login", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username: user, password: password })
      })
        .then(response => {
          if (response.status === 200) {
            resolve(response.json());
          }
        })
        .catch(error =>
          this.setState({
            error: "User and/or password is incorrect"
          })
        );
    });

  authenticateUser = () => () => {
    this.authenticate(this.state.user, this.state.password)
      .then(response => {
        sessionStorage.setItem("user", response.result.username);
        this.setState({
          returnedUser: response.result.username
        });
      })
      .catch();
  };

  render() {
    return this.state.returnedUser ? (
      <Redirect to="/user/storefront" />
    ) : (
      <div>
        <div>
          <h2 style={{ fontSize: 40, color: PrimaryBlue, marginBottom: "15px" }}>Customer Login</h2>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
           <Row style={{justifyContent: "center", marginBottom: "10px"}}>

            <label
              style={{
                fontSize: 20,
                color: PrimaryBlue,
                width: "180px"
              }}
            >
              Email/Username:{" "}
            </label>
              <input
                name="user"
                value={this.state.user}
                style={{width: 200, paddingLeft: "5px", fontSize: 14 }}
                onChange={this.handleChange}
              ></input>
           </Row>
           <Row style={{justifyContent: "center"}}>
            <label
              style={{
                fontSize: 20,
                color: PrimaryBlue,
                width: "180px"
              }}
            >
              Password:{" "}
            </label>
              <input
                name="password"
                type="password"
                value={this.state.password}
                style={{ height: 20, width: 200, paddingLeft: "5px", fontSize: 14 }}
                onChange={this.handleChange}
              ></input>
           </Row>
          </form>
          <PrimaryButton
            style={{
              marginTop: 10,
              backgroundColor: PrimaryBlue,
              // height: 30,
              // width: 160,
              fontWeight: "bold",
              cursor: "pointer",
              alignSelf: "center",
              borderRadius: "6px",
              fontSize: "14px"
            }}
            onClick={this.authenticateUser(
              this.state.user,
              this.state.password
            )}
          >
            Sign in
          </PrimaryButton>
          {this.state.error ? (
            <p style={{ color: "red" }}>{this.state.error}</p>
          ) : null}
          <p style={{ margin: "30px 0 10px 0", fontSize: "18px" }}>
            Don't have an account yet?
          </p>
          <Link
            style={{
              textDecoration: "none",
              fontWeight: 500,
              color: PrimaryBlue,
              cursor: "pointer"
            }}
            to="/user/create-account"
          >
            Click here to create one
          </Link>
        </div>
      </div>
    );
  }
}
export default UserLogin;
