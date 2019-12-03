import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

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
          <h2 style={{ fontSize: 40 }}>Customer Login</h2>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <label
              style={{
                display: "flex",
                flexDirection: "row",
                alignSelf: "center",
                fontSize: 20
              }}
            >
              Email/Username:{" "}
              <input
                name="user"
                value={this.state.user}
                style={{ height: 20, width: 200 }}
                onChange={this.handleChange}
              ></input>
            </label>
            <label
              style={{
                display: "flex",
                flexDirection: "row",
                alignSelf: "center",
                fontSize: 20
              }}
            >
              Password:{" "}
              <input
                name="password"
                type="password"
                value={this.state.password}
                style={{ height: 20, width: 200 }}
                onChange={this.handleChange}
              ></input>
            </label>
          </form>
          <button
            style={{
              color: "#07AAFF",
              marginTop: 10,
              backgroundColor: "#282c34",
              height: 25,
              width: 120,
              fontWeight: "bold",
              cursor: "pointer",
              alignSelf: "center"
            }}
            onClick={this.authenticateUser(
              this.state.user,
              this.state.password
            )}
          >
            Sign in
          </button>
          {this.state.error ? (
            <p style={{ color: "red" }}>{this.state.error}</p>
          ) : null}
          <p>Don't have an account?</p>
          <Link
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "#07AAFF",
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
