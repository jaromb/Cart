import React, { Component } from 'react';
import AddToCartButton from '../Components/AddToCart'
import { getCart, addItemToCart, removeItemFromCart, updateItemInCart } from '../Components/Cart'
import {getItems} from '../Components/GetItems'


class Storefront extends Component {
  state = {
    inventory: [],
    cartItems: [],
    updateItem: {},
    subtotal: '',
    tax:'.067',
    user: "guest"
  }


  checkoutAlert = () => {
    alert(`Are you sure you're ready to check out?`)
  }

  async componentDidMount() {
   const items = await getItems();
   const cart = await getCart();
   const user = sessionStorage.getItem('user')
   this.setState({
     inventory: items,
     cartItems: cart || [],
     subtotal: this.calculateSubtotal(),
     user: user || "guest"
   })    

}

  calculateSubtotal = (cart) => {
    let sum = 0
    for(let i=0; i<this.state.cartItems.length; i++) {
        sum += this.state.cartItems[i].price * this.state.cartItems[i].quantity
    }
    return sum.toFixed(2)
  }

  subtotal = this.calculateSubtotal(this.state.cartItems)
  
  addToCart = (item) => () => {
    addItemToCart(item)
    .then(cart =>
      this.setState({
      cartItems: cart
      })) 
    
  }

  updateCartItem = (item) => () => {
    updateItemInCart(item)
    .then(cart => 
      this.setState({
        cartItems: cart
      }))
  }

  handleAddClick = (item) => () => {
    if (this.state.cartItems.find(cartItem=> cartItem.itemID === item._id  && cartItem.user === this.state.user) === undefined) {
        console.log('add item')
        // console.log("cart ID=  " + cartItem.itemID)
        // console.log('item ID= ' + item._id)
        // console.log('user in state= ' + this.state.user)
        // console.log('cart user= ' + cartItem.user)
        console.log('state user= ' + this.state.user)
        console.log('item ID= ' + item._id)
        let addedItem = item
        addedItem.quantity = 1
        addItemToCart(addedItem)
        .then(cart=>
          this.setState({
            cartItems: cart
          }))
    }
    else {
      let cartCopy = this.state.cartItems
      for (let i=0; i<cartCopy.length; i++) {
        console.log("cart ID=  " + cartCopy[i].itemID)
        console.log('item ID= ' + item._id)
        console.log('user in state= ' + this.state.user)
        console.log('cart user= ' + cartCopy[i].user)

        if (cartCopy[i].itemID === item._id && this.state.user === cartCopy[i].user) {
          cartCopy[i].quantity+=1
          this.setState({
            updateItem: cartCopy[i]
          })
        }
        this.setState({
          cartItems: cartCopy
        })
      }
       updateItemInCart(this.state.updateItem)
       .then(cart=>
        this.setState({
          cartItems: cart
        }))
    }
      
  }

  removeItem = (item) => () => {
    removeItemFromCart(item._id)
    .then(cart =>
      this.setState({
        cartItems: cart
      }))
  }

  handleDeleteClick = (item) => () => {
    if(item.quantity === 1) {
      removeItemFromCart(item._id)
    .then(cart =>
      this.setState({
        cartItems: cart
      }))
    }
    else {
      let cartCopy = this.state.cartItems
      for (let i=0; i<cartCopy.length; i++) {
        if (cartCopy[i]._id === item._id) {
          cartCopy[i].quantity-=1
          this.setState({
            updateItem: cartCopy[i]
          })
        }
        this.setState({
          cartItems: cartCopy
        })
      }
       updateItemInCart(this.state.updateItem)
       .then(cart=>
        this.setState({
          cartItems: cart
        }))
    }
  }

  

 

  render() {
    return (
      <div>
        <section style = {{display: 'flex'}}>
          <div style = {{float: 'left', borderRight: '3px solid gray'}}>
          <h2 style = {{
              textDecoration: 'underline', 
              fontSize: 34}}
            >Store Inventory</h2>
            <ul style = {{
              listStyle: 'none', 
              padding: 0,
              display: 'flex',
              flexWrap: 'wrap',
              margin: 0,
              justifyContent: 'center'
              }}>
            {this.state.inventory.map((item)=> (
            <div key={item._id} style = {{
              border: '2px solid gray',
              width: '140px',
              fontWeight: 'bold',
              margin: 5,
              display: 'grid',
              gridTemplateRows: '.5fr 2fr 1fr .5fr',
              alignItems: 'center',
              justifyItems: 'center'
              }}>
              <li >{item.name} </li>
              <img style = {{width: 120}} src={item.image} alt=''/>              
              <p>Price = ${item.price}</p>
              <AddToCartButton style = {{
                color: '#07AAFF', 
                backgroundColor: '#282c34',
                height: 25,
                width: 140,
                fontWeight: 'bold',
                cursor: 'pointer'}} 
                onClick = {this.handleAddClick(item)}  
              />   
            </div>
            ))}
            </ul>
          </div>  
         
             {/*-------------THIS IS THE CART -------------------  */}
          <div style= {{
            float: 'right',
            width: '40em'
            }}> 
            <h2 style = {{
              textDecoration: 'underline', 
              fontSize: 34}}
            >Cart</h2>
            <ul style = {{
              listStyle: 'none',
              paddingLeft: 0
            }}>
           {this.state.cartItems.map((item, _id)=> (
                <div key={item._id} style={{
                  display: 'flex', 
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <li style={{
                  paddingRight: 10, 
                  width: 120,
                  fontWeight: 'bold',
                  paddingTop: 10,
                  fontSize: 22,
                  border: '1px solid black',
                  background: 'lightblue',
                  margin: 5,
                  lineHeight: 1
                  }}>
                  {item.name} <p style={{fontSize: 16, lineHeight:.1}}>{item.quantity} x ${item.price}</p>
                  </li>
                  <button style = {{
                    color: 'black', 
                    backgroundColor: 'lightgray',
                    width: 30,
                    height: 20,
                    border: '2px solid black',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }} 
                  onClick = {this.handleDeleteClick(item)}>X</button>
                </div>))}
            </ul>
            <h3>You have {this.state.cartItems.length} items in your cart.</h3>
            <h4 style={{lineHeight: .2, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>Subtotal: ${this.calculateSubtotal(this.state.cartItems)}</h4>
            <h4 style={{lineHeight: .2}}>Taxes: ${(this.state.tax * this.calculateSubtotal(this.state.cartItems)).toFixed(2)}</h4>
            <h3 style={{lineHeight: .2}}>Total: ${(Number(this.calculateSubtotal(this.state.cartItems)) + Number((this.state.tax * this.calculateSubtotal(this.state.cartItems)).toFixed(2))).toFixed(2)}</h3>
            <button 
            style = {{backgroundColor: 'gold',
            border: '2px solid black',
            fontSize: 16,
            fontWeight: 'bold',
            width: 120,
            cursor: 'pointer'}}
            onClick={this.checkoutAlert}>Complete Purchase</button>
          </div>
        </section>
      </div>
    );
  }
}
export default Storefront;