import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { PrimaryButton, Row } from "../Components/StyledComponents";
import { PrimaryBlue } from "../Components/Colors";

class AddUser extends Component {
  state = {
    newUser: "",
    newEmail: "",
    newPassword: "",
    error: null,
    addedUser: null
  };

  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      error: null
    });
  };

  addNewUser = () =>
    new Promise((resolve, reject) => {
      const newObject = {
        username: this.state.newUser,
        email: this.state.newEmail,
        password: this.state.newPassword
      };

      if (
        this.state.newUser !== "" &&
        this.state.newEmail !== "" &&
        this.state.newPassword !== ""
      ) {
        fetch("https://my-helio-cart-api.herokuapp.com/users", {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify(newObject),
          credentials: "include"
        })
          .then(result => resolve(result.json()))
          .catch(reject);
      } else {
        alert("Did you complete all information fields?");
      }
    });

  addUser = () => () => {
    this.addNewUser()
      .then(result => {
        this.setState({
          addedUser: result,
          error: null
        });
      })
      .catch(error =>
        this.setState({
          error: "Username already taken.  Please enter a new username."
        })
      );
  };

  render() {
    return this.state.addedUser ? (
      <Redirect to="/user/login" />
    ) : (
      <div>
        <h2 style={{ fontSize: 40, color: PrimaryBlue, marginBottom: "10px" }}>
          Create New Account
        </h2>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <Row style={{ justifyContent: "center", marginBottom: "5px" }}>
            <label
              style={{
                fontSize: 20,
                color: PrimaryBlue,
                width: "120px"
              }}
            >
              Email:
            </label>
            <input
              type="email"
              name="newEmail"
              value={this.state.newEmail}
              style={{ height: 20, width: 200, fontSize: 14, paddingLeft: 5 }}
              onChange={this.handleChange}
            ></input>
          </Row>
          <Row style={{justifyContent: "center", marginBottom: "5px"}}>
          <label
            style={{
              fontSize: 20,
              color: PrimaryBlue,
              width: "120px"
            }}
          >
            Username:
          </label>
            <input
              name="newUser"
              value={this.state.newUser}
              style={{ height: 20, width: 200, fontSize: 14, paddingLeft: 5 }}
              onChange={this.handleChange}
            ></input>
          </Row>
          <Row style={{justifyContent: "center"}}>
          <label
            style={{
              fontSize: 20,
              color: PrimaryBlue,
              width: "120px"
            }}
          >
            Password:
          </label> 
            <input
              name="newPassword"
              value={this.state.newPassword}
              style={{ height: 20, width: 200, fontSize: 14, paddingLeft: 5 }}
              onChange={this.handleChange}
            ></input>
          </Row>
        </form>
        <PrimaryButton onClick={this.addUser()}>
          Create my account
        </PrimaryButton>
        <p style={{ color: "red" }}>{this.state.error}</p>
        <p>Already have an account?</p>
        <Link
          style={{
            textDecoration: "none",
            fontWeight: "bold",
            color: "#07AAFF",
            cursor: "pointer"
          }}
          to="/user/login"
        >
          Sign in here
        </Link>
      </div>
    );
  }
}

export default AddUser;
