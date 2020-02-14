import React, {
  Component,
  useState,
  useEffect,
  createContext,
  useReducer
} from "react";
import Storefront from "./Pages/Storefront";
import AddUser from "./Pages/AddUser";
import UserLogin from "./Pages/UserLogin";
import User from "./Pages/User";
import GroceryBasket from "../src/Images/Grocery-basket-clipart.png";

import "../src/App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { clearCookies } from "./Components/Logout";
export const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: "guest",
  token: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "Login":
      console.log(action.payload);
      sessionStorage.setItem(
        "user",
        action.payload.response.username
      );
      sessionStorage.setItem(
        "userToken",
        action.payload.response.token
      );
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.response.username,
        token: action.payload.response.token
      };
    case "Logout":
      sessionStorage.clear();
      clearCookies();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null
      };

    case "VerifyAuth":
      const user = sessionStorage.getItem("user") || null;
      const token = sessionStorage.getItem("token");
      if (user) {
        return {
          ...state,
          isAuthenticated: true,
          user: user,
          token: token
        };
      }

    default:
      return state;
  }
};
function App() {
  // const [data, setData] = useState(initialState)
  const [state, dispatch] = useReducer(reducer, initialState);

  function checkUser() {
    const user = sessionStorage.getItem("user");
    const token = sessionStorage.getItem("token");

    if (token) {
      dispatch({ ...state, user: user, token: token, isAuthenticated: true });
    }
  }

  useEffect(() => {
    dispatch({ type: "VerifyAuth" });
  }, []);

  const handleLogout = () => {
    dispatch({
      type: "Logout"
    });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <div className="App">
        <Router>
          <div>
            <nav
              className="App-header"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                height: 120
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "Row",
                  alignItems: "baseline"
                }}
              >
                <img
                  style={{ width: "50px", height: "50px", marginRight: "8px" }}
                  src={GroceryBasket}
                />
                <h1
                  style={{
                    fontSize: 50,
                    fontWeight: "bold",
                    justifyContent: "center"
                  }}
                >
                  <Link style={{ textDecoration: "none" }} to="/home">
                    Stuff to Eat
                  </Link>
                </h1>
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  color: "#07AAFF",
                  fontSize: 20
                }}
              >
                <li>
                  <Link style={{ textDecoration: "none" }} to="/">
                    Home
                  </Link>
                </li>
                {!state.isAuthenticated ? (
                  <li>
                    <Link style={{ textDecoration: "none" }} to="/user/login">
                      Login
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link
                      onClick={handleLogout}
                      style={{ textDecoration: "none" }}
                      to="/"
                    >
                      Logout
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
            <Switch>
              <Route path="/" exact component={User} />
              <Route path="/user/storefront" exact component={Storefront} />
              <Route path="/user/login" exact component={UserLogin} />
              <Route path="/user/create-account" exact component={AddUser} />
            </Switch>
          </div>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
