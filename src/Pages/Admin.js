import React, { Component } from 'react';
// import '/Users/jarombridges/Helio/Cart/cart/src/App.css'
import {getItems} from '../Components/GetItems'
import InventoryList from '../Components/InventoryList'

class Admin extends Component {
  state = {
    inventory: [],
    name: '',
    price: '',
    url: '',
    newItem: {},
    updateName: '',
    updatePrice: '',
    updateURL: '',
    selectValue: 'Cereal',
    formUpdateName: '',
    formUpdatePrice: '',
    formUpdateUrl: ''
  }

  async componentDidMount() {
    const items = await getItems();
    this.setState({
      inventory: items
    })    
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

    fetch("http://localhost:5000/items", {
        method: "POST",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify(newObject)
    })
    .then(inventory => {
        resolve(inventory.json())
    }).catch(reject)
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

  updateInventoryItem = (id) => new Promise((resolve,reject) => {
    const updatedObject = {name: this.state.updateName,
    price: this.state.updatePrice,
    image: this.state.updateURL}

    fetch(`http://localhost:5000/items/${id}`, {
        method: "PATCH",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify(updatedObject)
    })
    .then(inventory => {
        resolve(inventory.json())
    }).catch(reject)
})

updateInventory = (name) => () => {
    this.updateInventoryItem(name)
    .then(inventory => 
        this.setState({
            inventory: inventory
        }))
      .then(
          this.clearUpdateInputs
      )   
}

handleDropdownSelect = (e) => {
    
    this.setState({
        selectValue: e.target.value
    })
}

nameChange = (event) => {
    
    
    this.setState({

    }
    )
}

  render() {
    return (
      <div style={{display: 'flex'}}>
          <div>
            <h1>Add Item to Inventory</h1>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <label style={{height: 40}}>Item name: <input name='name' placeholder='e.g. Turkey' ref='name' type='text' onChange={this.handleChange}></input></label>
              <label style={{height: 40}}>Item price: <input name='price' maxlength= '4' type='number' placeholder='format is 00.00' ref='price' onChange={this.handleChange}></input></label>
              <label style={{height: 40}}>Image url: <input name='url' ref='url' type='url' placeholder='http://yourimage.jpeg' onChange={this.handleChange}></input></label>
              <button style = {{
                color: '#07AAFF', 
                backgroundColor: '#282c34',
                height: 25,
                width: 120,
                fontWeight: 'bold',
                cursor: 'pointer',
                alignSelf: 'center'}} onClick={this.addToInventory()}>Add Item</button>
            </div>

            <div>
               <h1>Modify Item Characteristics</h1>
                <label>Current Name: </label><select onChange = {this.handleDropdownSelect} style={{marginBottom: 10}}>
                {this.state.inventory.map((item)=> (
                    <option> {item.name}</option>
                )
                )}
                </select>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <label style={{height: 40}}>New name: <input name='updateName' placeholder='e.g. Turkey' ref='updateName' type='text' onChange={this.handleChange}></input></label>
                    <label style={{height: 40}}>New price: <input name='updatePrice' maxlength= '4' type='number' placeholder='format is 00.00' ref='updatePrice' onChange={this.handleChange}></input></label>
                    <label style={{height: 40}}>New url: <input name='updateURL' ref='updateURL' type='url' placeholder='http://yourimage.jpeg' onChange={this.handleChange}></input></label>
                    <button style = {{
                        color: '#07AAFF', 
                        backgroundColor: '#282c34',
                        height: 25,
                        width: 120,
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        alignSelf: 'center'}} onClick={
                            this.updateInventory(this.state.selectValue)}>Update Item</button>
                </div>
            </div>
          </div>
        
          <hr style={{height: '90vh'}}/>

          <div style={{dixplay: 'flex'}}>
            <h1> Current Inventory</h1>
            <InventoryList/>
          </div>
          
      </div>
    );
  }
}
export default Admin;