import React, { Component } from 'react';
import { getItems } from './GetItems'

class InventoryList extends Component {
    state = {
        inventory: [],
        nameField: '',
        priceField: ''
    }

    async componentDidMount() {
        const items = await getItems();
        this.setState({
          inventory: items
        })    
     }

     removeItemFromInventory = (id) => new Promise((resolve,reject) => {
        fetch(`https://my-helio-cart-api.herokuapp.com/items/${id}`, {
            method: "DELETE"
        })
        .then(inventory => {
            resolve(inventory.json())
        }).catch(reject)
    })
    
    removeFromInventory = (item) => () => {
        console.log('clicked');
        this.removeItemFromInventory(item.id)
        .then(inventory =>
            this.setState({
                inventory: inventory
            }))
    }

    modifyInventoryItem = (id) => new Promise((resolve,reject) => {
        fetch(`https://my-helio-cart-api.herokuapp.com/items/${id}`, {
            method: "POST",
            body: {}
        })
        .then(inventory => {
            resolve(inventory.json())
        }).catch(reject)
    })
    
    modifyInventory = (item) => () => {
        console.log('clicked');
        this.modyInventoryItem(item.id)
        .then(inventory =>
            this.setState({
                inventory: inventory
            }))
    }

    changeNameFieldValue = (event) => {
        if (event) {
        this.setState({
            nameField: event.target.name
        })
    }
    }

    handleNameChange = (event) => {
        this.setState({
            nameField: event.target.value
        })
    }

    render() {
        return (
            <ul style={{display: 'flex', flexDirection: 'column', lineHeight: .05}}>
            {this.state.inventory.map((item)=> (
                <div>
                <li style = {{
                display: 'flex', flexDirection: 'row', flexWrap: 'wrap'
                }}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <p style={{paddingRight: 5}}>Name:  </p>
                        <input ref ='nameField' name = {item.name} class='inventory' value = {this.state.nameField === '' ? item.name : this.state.nameField} onClick= {this.changeNameFieldValue} onChange = {this.handleNameChange} style = {{width: 140, fontSize:16, height: 20, paddingTop: 5}}></input>                
                    </div>    
                    <div style={{display: 'flex', flexDirection: 'row'}}>    
                        <p style={{paddingRight: 5, paddingLeft: 5}}>Price: </p>
                        <input class='inventory' value = {item.price} style = {{width: 80, fontSize: 16, height: 20, paddingTop: 5}}></input>
                    </div>    
                    <button style = {{
                        color: '#07AAFF', 
                        backgroundColor: '#282c34',
                        height: 25,
                        width: 80,
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        alignSelf: 'center',
                        marginRight: 5}} 
                        onClick={this.modifyInventory(item)}>Modify</button>
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
                </li>
                </div>
                ))}
            </ul>
            
        )
    }
}

export default InventoryList;