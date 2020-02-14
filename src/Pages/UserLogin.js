import React, { Component, useEffect, useState, useContext } from "react";
import { AuthContext } from "../App"
import { Link, Redirect } from "react-router-dom";
import { PrimaryBlue, PrimaryOrange } from "../Components/Colors";
import { PrimaryButton, Row } from "../Components/StyledComponents";

export function UserLogin() {
  const { dispatch } = useContext(AuthContext)
  const initialState = {
    user: "",
    password: "",
    returnedUser: null,
    isSubmitting: false,
    error: null
  }

  const [data, setData] = useState(initialState)

  // const [user, setUser] = useState(null);
  // const [password, setPassword] = useState("");
  // const [returnedUser, setReturnedUser] = useState(null);
  // const [error, setError] = useState(null);

async function setReturnedUser() {
  const returnedUser = await sessionStorage.getItem("user");
  setData({
    ...data,
    returnedUser: returnedUser
  })
}

  useEffect(() => {
    setReturnedUser()
  }, []);

  const handleUsername = event => {
    setData({
      ...data,
      user: event.target.value});
  };

  const handlePassword = event => {
    setData({
      ...data,
      password: event.target.value});
  };

  const handleEnter = () => e => {
    if (e.key === "Enter") {
      authenticate(data.user, data.password)
        .then(response => {
          sessionStorage.setItem("user", response.response.username);
          setData({
            ...data,
            returnedUser: response.response.username});
        })
        .catch();
    }
  };

  const authenticate = (user, password) =>
    new Promise((resolve, reject) => {
      // console.log("user = " + user );
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
        .catch(error => setData({...data,
          error: "User authentication failed"}));
    });

  const authenticateUser = () => () => {
    authenticate(data.user, data.password)
      .then(response => {
        console.log(response);
        dispatch({
          type: "Login",
          payload: response
        })

        setData({
          ...data,
          returnedUser: response.response.username
        });
        
      })
      .catch();
  };

  return data.returnedUser ? (
    <Redirect to="/user/storefront" />
  ) : (
    <div>
      <div>
        <h2 style={{ fontSize: 40, color: PrimaryBlue, marginBottom: "15px" }}>
          Customer Login
        </h2>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <Row style={{ justifyContent: "center", marginBottom: "10px" }}>
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
              value={data.user}
              style={{ width: 200, paddingLeft: "5px", fontSize: 14 }}
              onChange={handleUsername}
            ></input>
          </Row>
          <Row style={{ justifyContent: "center" }}>
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
              value={data.password}
              style={{
                height: 20,
                width: 200,
                paddingLeft: "5px",
                fontSize: 14
              }}
              onChange={handlePassword}
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
          onClick={authenticateUser(data.user, data.password)}
        >
          Sign in
        </PrimaryButton>
        {data.error ? <p style={{ color: "red" }}>{data.error}</p> : null}
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
export default UserLogin;
