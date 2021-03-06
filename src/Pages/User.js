import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PrimaryOrange, PrimaryBlue } from "../Components/Colors.js"

class User extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h2 style={{ fontSize: 40, color: PrimaryBlue }}>Customer Portal</h2>
        <button style={{ width: 300, height: 50, backgroundColor: PrimaryBlue, borderRadius: "10px" }}>
          <Link
            style={{
              textDecoration: "none",
              height: 100,
              fontSize: 35,
              fontWeight: "bold",
              color: "#white"
            }}
            to="/user/storefront"
          >
            Shop as Guest
          </Link>
        </button>
        <button
          style={{
            width: 300,
            height: 50,
            backgroundColor: PrimaryBlue,
            marginTop: 28,
            borderRadius: "10px"
          }}
        >
          <Link
            style={{
              textDecoration: "none",
              height: 100,
              fontSize: 35,
              fontWeight: "bold",
              color: "white"
            }}
            to="/user/login"
          >
            Customer Login
          </Link>
        </button>
        <button
          style={{
            width: 300,
            height: 50,
            backgroundColor: PrimaryBlue,
            marginTop: 28,
            borderRadius: "10px"
          }}
        >
          <Link
            style={{
              textDecoration: "none",
              height: 100,
              fontSize: 35,
              fontWeight: "bold", 
              color: "white"
            }}
            to="/user/create-account"
          >
            Create Account
          </Link>
        </button>
      </div>
    );
  }
}
export default User;
