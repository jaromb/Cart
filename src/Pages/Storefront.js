import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import {
  AddToCartButton,
  Column,
  Row,
  PrimaryButton
} from "../Components/StyledComponents";
import {
  getCart,
  addItemToCart,
  removeItemFromCart,
  updateItemInCart
} from "../Components/Cart";
import { getItems } from "../Components/GetItems";
import { PrimaryBlue, PrimaryOrange } from "../Components/Colors";

class Storefront extends Component {
  state = {
    inventory: [],
    cartItems: [],
    updateItem: {},
    subtotal: "",
    tax: ".067",
    user: "guest"
  };

  checkoutAlert = () => {
    alert(`Are you sure you're ready to check out?`);
  };

  async componentDidMount() {
    const items = await getItems();
    const cart = await getCart();
    const user = sessionStorage.getItem("user");
    this.setState({
      inventory: items,
      cartItems: cart || [],
      subtotal: this.calculateSubtotal(),
      user: user || "guest"
    });
  }

  calculateSubtotal = cart => {
    let sum = 0;
    for (let i = 0; i < this.state.cartItems.length; i++) {
      sum += this.state.cartItems[i].price * this.state.cartItems[i].quantity;
    }
    return sum.toFixed(2);
  };

  subtotal = this.calculateSubtotal(this.state.cartItems);
  addToCart = item => () => {
    addItemToCart(item).then(cart =>
      this.setState({
        cartItems: cart
      })
    );
  };

  updateCartItem = item => () => {
    updateItemInCart(item).then(cart =>
      this.setState({
        cartItems: cart
      })
    );
  };

  handleAddClick = item => () => {
    if (
      this.state.cartItems.find(
        cartItem =>
          cartItem.itemID === item._id && cartItem.user === this.state.user
      ) === undefined
    ) {
      console.log("add item");
      // console.log("cart ID=  " + cartItem.itemID)
      // console.log('item ID= ' + item._id)
      // console.log('user in state= ' + this.state.user)
      // console.log('cart user= ' + cartItem.user)
      console.log("state user= " + this.state.user);
      console.log("item ID= " + item._id);
      let addedItem = item;
      addedItem.quantity = 1;
      addItemToCart(addedItem).then(cart =>
        this.setState({
          cartItems: cart
        })
      );
    } else {
      let cartCopy = this.state.cartItems;
      for (let i = 0; i < cartCopy.length; i++) {
        console.log("cart ID=  " + cartCopy[i].itemID);
        console.log("item ID= " + item._id);
        console.log("user in state= " + this.state.user);
        console.log("cart user= " + cartCopy[i].user);

        if (
          cartCopy[i].itemID === item._id &&
          this.state.user === cartCopy[i].user
        ) {
          cartCopy[i].quantity += 1;
          this.setState({
            updateItem: cartCopy[i]
          });
        }
        this.setState({
          cartItems: cartCopy
        });
      }
      updateItemInCart(this.state.updateItem).then(cart =>
        this.setState({
          cartItems: cart
        })
      );
    }
  };

  removeItem = item => () => {
    removeItemFromCart(item._id).then(cart =>
      this.setState({
        cartItems: cart
      })
    );
  };

  handleDeleteClick = item => () => {
    if (item.quantity === 1) {
      removeItemFromCart(item._id).then(cart =>
        this.setState({
          cartItems: cart
        })
      );
    } else {
      let cartCopy = this.state.cartItems;
      for (let i = 0; i < cartCopy.length; i++) {
        if (cartCopy[i]._id === item._id) {
          cartCopy[i].quantity -= 1;
          this.setState({
            updateItem: cartCopy[i]
          });
        }
        this.setState({
          cartItems: cartCopy
        });
      }
      updateItemInCart(this.state.updateItem).then(cart =>
        this.setState({
          cartItems: cart
        })
      );
    }
  };

  handleAddInCart = item => () => {
    let cartCopy = this.state.cartItems;
    for (let i = 0; i < cartCopy.length; i++) {
      if (cartCopy[i]._id === item._id) {
        cartCopy[i].quantity += 1;
        this.setState({
          updateItem: cartCopy[i]
        });
      }
      this.setState({
        cartItems: cartCopy
      });
    }
    updateItemInCart(this.state.updateItem).then(cart =>
      this.setState({
        cartItems: cart
      })
    );
  };

  handleTrashClick = item => () => {
    removeItemFromCart(item._id).then(cart =>
      this.setState({
        cartItems: cart
      })
    );
  };

  render() {
    return (
      <div>
        <section style={{ display: "flex"}}>
          <div
            style={{
              float: "left",
              borderRight: "3px solid lightgray",
              margin: "0 20px"
            }}
          >
            <h2
              style={{
                fontSize: 38,
                color: PrimaryBlue,
                fontWeight: 700,
                fontFamily: "avenir next",
                margin: "15px"
              }}
            >
              Store Inventory
            </h2>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                display: "flex",
                flexWrap: "wrap",
                margin: 0,
                justifyContent: "center"
              }}
            >
              {this.state.inventory.map(item => (
                <Column style={{ alignItems: "center", marginBottom: "10px" }}>
                  <Column
                    key={item._id}
                    style={{
                      width: "140px",
                      margin: "5px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: "3px solid",
                      borderColor: PrimaryBlue,
                      height: "190px",
                      borderRadius: "10px",
                      backgroundColor: "white"
                    }}
                  >
                    <li
                      style={{
                        fontFamily: "avenir next",
                        fontSize: "19px",
                        fontWeight: 600
                      }}
                    >
                      {item.name}{" "}
                    </li>
                    <img style={{ width: 120 }} src={item.image} alt="" />
                    <p style={{ marginBottom: "5px" }}>Price = ${item.price}</p>
                  </Column>
                  <AddToCartButton
                    style={{ marginTop: "0px" }}
                    onClick={this.handleAddClick(item)}
                  >
                    Add To Cart
                  </AddToCartButton>
                </Column>
              ))}
            </ul>
          </div>

          {/*-------------THIS IS THE CART -------------------  */}
          <div
            style={{
              float: "right",
              width: "40em",
              margin: "0 20px 0 0"
            }}
          >
            <h2
              style={{
                fontSize: 38,
                fontFamily: "avenir next",
                color: PrimaryBlue,
                margin: "15px 0",
                textAlign: "center"
              }}
            >
              Cart
            </h2>
            <ul
              style={{
                listStyle: "none",
                paddingLeft: 0
              }}
            >
              {this.state.cartItems.map((item, _id) => (
                <div
                  key={item._id}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <li
                    style={{
                      // padding: "0 10px",
                      width: 120,
                      fontWeight: 640,
                      fontSize: 20,
                      lineHeight: 0.8,
                      fontFamily: "avenir next"
                    }}
                  >
                    <Column
                      style={{
                        textAlign: "center",
                        border: "2px solid",
                        borderColor: PrimaryBlue,
                        padding: "0 5px 5px 5px",
                        borderRadius: "10px",
                        marginBottom: "8px",
                        backgroundColor: "white"
                      }}
                    >
                      <Row
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          margin: 0
                        }}
                      >
                        <img
                          style={{
                            maxHeight: "25px",
                            width: "auto",
                            paddingRight: "3px"
                          }}
                          src={item.image}
                        ></img>
                        <p>{item.name} </p>
                      </Row>
                      <p
                        style={{ fontSize: 16, lineHeight: 0.1, marginTop: 0 }}
                      >
                        {item.quantity} x ${item.price} ea
                      </p>
                      <Row
                        style={{
                          justifyContent: "center",
                          alignItems: "space-around",
                          margin: "0 5px"
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{
                            color: PrimaryBlue,
                            cursor: "pointer",
                            marginRight: "13px",
                            fontSize: "15px"
                          }}
                          onClick={this.handleAddInCart(item)}
                        ></FontAwesomeIcon>
                        <FontAwesomeIcon
                          icon={faMinus}
                          style={{
                            color: PrimaryBlue,
                            cursor: "pointer",
                            marginRight: "13px",
                            fontSize: "15px"
                          }}
                          onClick={this.handleDeleteClick(item)}
                        ></FontAwesomeIcon>
                        <FontAwesomeIcon
                          onClick={this.handleTrashClick(item)}
                          style={{
                            color: PrimaryOrange,
                            cursor: "pointer",
                            fontSize: "15px"
                          }}
                          icon={faTrashAlt}
                        ></FontAwesomeIcon>
                      </Row>
                    </Column>
                  </li>
                </div>
              ))}
            </ul>
            <h3>
              You have{" "}
              <b
                style={{
                  fontWeight: 800,
                  fontSize: "22px",
                  color: PrimaryOrange
                }}
              >
                {this.state.cartItems.length}
              </b>{" "}
              items in your cart.
            </h3>
            <h4
              style={{
                lineHeight: 0.2,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center"
              }}
            >
              Subtotal: ${this.calculateSubtotal(this.state.cartItems)}
            </h4>
            <h4 style={{ lineHeight: 0.2 }}>
              Taxes: $
              {(
                this.state.tax * this.calculateSubtotal(this.state.cartItems)
              ).toFixed(2)}
            </h4>
            <h3 style={{ lineHeight: 0.2 }}>
              Total: $
              {(
                Number(this.calculateSubtotal(this.state.cartItems)) +
                Number(
                  (
                    this.state.tax *
                    this.calculateSubtotal(this.state.cartItems)
                  ).toFixed(2)
                )
              ).toFixed(2)}
            </h3>
            <PrimaryButton
              style={{
                backgroundColor: PrimaryBlue,
                color: "white",
                fontSize: "21px",
                fontWeight: 700,
                width: 120,
                height: 60,
                cursor: "pointer",
                fontFamily: "avenir next",
                boxShadow: "3px 3px gray"
              }}
              onClick={this.checkoutAlert}
            >
              Finalize Order
            </PrimaryButton>
          </div>
        </section>
      </div>
    );
  }
}
export default Storefront;
