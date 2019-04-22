import React, { Component } from 'react';
// import '/Users/jarombridges/Helio/Cart/cart/src/App.css'
import {getItems} from '../Components/GetItems'
import {Link, Redirect} from 'react-router-dom'

class Inventory extends Component {
  state = {
    inventory: [],
    name: '',
    price: '',
    url: '',
    newItem: {},
    updatedName: '',
    updatedPrice: '',
    updatedURL: '',
    updateID: '',
    modifyButtonClicked: false,
    error: null
    // user: null
  }

  async componentDidMount() {
    try {
    const items = await getItems();
    this.setState({
        // user: sessionStorage.getItem('user'),
        inventory: items || []
    })
    } 
    catch {
        this.setState({
            error: 'user not authorized'
        })
    }
 }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
  }

  addItemToInventory = () => new Promise((resolve,reject) => {
    const newObject = {name: this.state.name,
    price: this.state.price,
    image: this.state.url}

    if(this.state.name !== '' && this.state.price !== '' && this.state.url !== '') {
    fetch("https://my-helio-cart-api.herokuapp.com//items", {
        method: "POST",
        credentials: 'include',
        headers: {"content-Type": "application/json"},
        body: JSON.stringify(newObject)
    })
    .then(inventory => {
        resolve(inventory.json())
    }).catch(reject)
}
    else {
        alert('Did you complete all information fields?')
    }
})

  addToInventory = () => () => {
      this.addItemToInventory()
      .then(inventory => 
          this.setState({
              inventory: inventory
          }))
        .then(
            this.clearInputs
        )   
  }

  clearInputs = () => {
      this.refs.name.value = '';
      this.refs.price.value = '';
      this.refs.url.value = ''
  }

  clearUpdateInputs = () => {
      this.refs.updateName.value = '';
      this.refs.updatePrice.value = '';
      this.refs.updateURL.value = ''
  }


handleAddTextClick = () => {
    this.setState({
        modifyButtonClicked: false,
        url: ''
    })
}

handleModifyClick = (item) => () => {
    this.setState({
        modifyButtonClicked: true,
        updatedName: item.name,
        updatedPrice: item.price,
        updatedURL: item.image,
        updateID: item._id
    })
}


modifyInventoryItem = () => new Promise((resolve,reject) => {
    const modifiedObject = {name: this.state.updatedName, 
        price: this.state.updatedPrice,
        image: this.state.updatedURL,
        _id: this.state.updateID}
    fetch(`https://my-helio-cart-api.herokuapp.com//items`, {
        method: "POST",
        credentials: 'include',
        headers: {"content-Type": "application/json"},
        body: JSON.stringify(modifiedObject)
    })
    .then(inventory => {
        resolve(inventory.json())
    }).catch(reject)
})

modifyInventory = () => () => {
    console.log('clicked');
    this.modifyInventoryItem()
    .then(inventory =>
        this.setState({
            inventory: inventory
        }))
}

removeItemFromInventory = (_id) => new Promise((resolve,reject) => {
    fetch(`https://my-helio-cart-api.herokuapp.com//items/${_id}`, {
        method: "DELETE",
        credentials: 'include'
    })
    .then(inventory => {
        resolve(inventory.json())
    }).catch(reject)
})

removeFromInventory = (item) => () => {
    console.log('clicked');
    this.removeItemFromInventory(item._id)
    .then(inventory =>
        this.setState({
            inventory: inventory
        }))
}



  render() {
      return this.state.error ?
      <div>
        <p style={{color: 'red', fontSize: 30}}>USER NOT AUTHORIZED</p>
        <Link style={{fontSize: 20, textDecoration: 'none'}} exact to='/admin/login'>Go to admin login page</Link>
      </div>
      :
        
        <div style={{marginTop: 10}}>
        <Link style={{textDecoration: 'none', fontSize: 20}} to='/admin/userManagement'>Go to User Management</Link>
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <div>
           {this.state.modifyButtonClicked === false ? 
           <div style={{display: 'flex', flexDirection: 'column'}}>

                             {/* ------------------------------ADD TO INVENTORY---------------------------------- */}

            <h1>Add Item to Inventory</h1>
            <form style={{display: 'flex', flexDirection: 'column'}}>
              <label style={{height: 40}}>Item name: <input name='name' value={this.state.name} placeholder='e.g. Turkey' ref='name' type='text' onChange={this.handleChange}></input></label>
              <label style={{height: 40}}>Item price: <input name='price' value={this.state.price} maxLength= '4' type='number' placeholder='00.00' ref='price' onChange={this.handleChange}></input></label>
              <label style={{height: 40}}>Image url: <input name='url' value={this.state.url} ref='url' type='url' placeholder='http://yourimage.jpeg' onChange={this.handleChange}></input></label>
              <button style = {{
                color: '#07AAFF', 
                backgroundColor: '#282c34',
                height: 25,
                width: 120,
                fontWeight: 'bold',
                cursor: 'pointer',
                alignSelf: 'center'}} onClick={this.addToInventory()}>Add Item</button>
            </form>
            
           </div>
           :  
                
            <div>
                           {/* -----------------------INVENTORY MODIFICATION---------------------------- */}

               <h1>Modify Item Characteristics</h1>
                <form style={{display: 'flex', flexDirection: 'column'}}>
                    <label style={{height: 40, justifySelf: 'center', fontWeight: 'bold'}}>Item ID: {this.state.updateID}</label>
                    <label style={{height: 40}}>Item Name: <input name='updatedName' placeholder='e.g. Turkey' ref='updateName' value={this.state.updatedName} type='text' onChange={this.handleChange}></input></label>
                    <label style={{height: 40}}>Item Price: <input name='updatedPrice' type='number' placeholder='00.00' value = {this.state.updatedPrice} ref='updatePrice' onChange={this.handleChange}></input></label>
                    <label style={{height: 40}}>Image Url: <input name='updatedURL' ref='updateURL' type='url' placeholder='http://yourimage.jpeg' value = {this.state.updatedURL} onChange={this.handleChange}></input></label>
                    <button style = {{
                        color: '#07AAFF', 
                        backgroundColor: '#282c34',
                        height: 25,
                        width: 120,
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        alignSelf: 'center'}} onClick={
                            this.modifyInventory()}>Update Item</button>
                </form>
                <br></br>
                
                <p>Click below to</p>
                <p style={{fontWeight: 'bold', color: '#07AAFF', cursor: 'pointer'}} onClick={this.handleAddTextClick}>Add an Item to Inventory</p>
            </div>
}
          </div>
        
        {/* ------------------------INVENTORY DISPLAY ----------------------- */}

          <div style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
            <h1> Current Inventory</h1>
            <table style={{border: '1px solid gray'}}>
                <thead  style={{border: '1px solid gray'}}>
                    <tr>
                        <th style={{border: '1px solid gray'}}>Item Name</th>
                        <th style={{border: '1px solid gray'}}>Price</th>
                        <th style={{border: '1px solid gray'}}>Image</th>
                        <th style={{border: '1px solid gray'}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
            {this.state.inventory.map((item)=> (
                   
                    <tr>
                        <td style={{border: '1px solid gray'}}>{item.name}</td>
                        <td style={{border: '1px solid gray'}}>${item.price}</td>
                        <td style={{border: '1px solid gray'}}><img style={{width: 40}} src={item.image} alt =''></img></td>
                        <td style={{display: 'flex', flexDirection: 'row', border: '1px solid gray', height: 45, paddingLeft: 5}}>
                            <button style = {{
                                color: '#07AAFF', 
                                backgroundColor: '#282c34',
                                height: 25,
                                width: 80,
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                alignSelf: 'center',
                                marginRight: 5}} 
                                onClick={this.handleModifyClick(item)}>Modify</button>
                            <button style = {{
                                color: '#07AAFF', 
                                backgroundColor: '#282c34',
                                height: 25,
                                width: 80,
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                alignSelf: 'center',
                                marginRight: 5}} 
                                onClick={this.removeFromInventory(item)}>Remove</button> 
                        </td>
                    </tr>
                
            ))}
            </tbody>
            </table>
            
          </div>
          
      </div>
      </div>
      
  }
}
export default Inventory;