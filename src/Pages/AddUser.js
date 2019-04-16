import React, {Component} from 'react';
import {Link} from "react-router-dom";


class AddUser extends Component {
    state = {
        newUser: '',
        newEmail: '',
        newPassword: ''
    }

    addNewUser = () => new Promise((resolve,reject) => {
        const newObject = {username: this.state.newUser,
        email: this.state.newEmail,
        password: this.state.newPassword}
    
        if(this.state.newUser !== '' && this.state.newEmail !== '' && this.state.newPassword !== '') {
        fetch("https://my-helio-cart-api.herokuapp.com/users", {
            method: "POST",
            headers: {"content-Type": "application/json"},
            body: JSON.stringify(newObject)
        })
        .catch(reject)
    }
        else {
            alert('Did you complete all information fields?')
        }
    })

    addUser = () => () => {
        this.addNewUser()
        .then(this.setState({
            createTextClicked: false
        }))
    }

    loadLogin = () => () => {

    }

    render() {
        return (
            <div>
                <h2 style={{fontSize: 40}}>Create New Account</h2>
                    <form style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <label style={{display: 'flex', flexDirection: 'row', alignSelf:'center', fontSize: 20}}>Email: <input name='newEmail' value={this.state.newEmail} style={{height: 20, width: 200}} onChange={this.handleChange}></input></label>
                        <label style={{display: 'flex', flexDirection: 'row', alignSelf:'center', fontSize: 20}}>Username: <input name='newUser' value={this.state.newUser} style={{height: 20, width: 200}} onChange={this.handleChange}></input></label>
                        <label style={{display: 'flex', flexDirection: 'row', alignSelf:'center', fontSize: 20}}>Password: <input name='newPassword' value={this.state.newPassword} style={{height: 20, width: 200}} onChange={this.handleChange}></input></label>
                        <button style = {{
                            color: '#07AAFF', 
                            backgroundColor: '#282c34',
                            height: 25,
                            width: 160,
                            fontWeight: 'bold',
                            marginTop: 10,
                            cursor: 'pointer',
                            alignSelf: 'center'}} onClick={this.addUser()}>Create my account</button>
                    </form>
                    <p>Already have an account?</p>
                    <Link style={{textDecoration: 'none', fontWeight: 'bold', color: '#07AAFF', cursor: 'pointer'}} to='/user/login'>Sign in here</Link>
            </div>
        )
    }
}

export default AddUser