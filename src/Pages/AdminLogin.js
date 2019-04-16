import React, { Component} from 'react';
import {Redirect} from 'react-router-dom'

class AdminLogin extends Component {
    state = {
        user: '',
        password: '',
        returnedUser: null,
        error: null
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        })
      }

    //   userInfo = {username: this.state.user, password: this.state.password}

    authenticate = (user, password) => new Promise((resolve,reject) => {
        console.log('clicked')
        fetch("https://my-helio-cart-api.herokuapp.com/admin/login", {
            method: "POST",
            headers: {"content-Type": "application/json"},
            body: JSON.stringify({username: user, password: password})
        })
        .then(()=> {
            console.log('fetch sent')
        })
    })  

    authenticateUser = () => () => {
        this.authenticate(this.state.user, this.state.password);
    }  

    

    render() {
         return this.state.returnedUser ? 
                <Redirect to='/admin'/> 
                :
            <div>
                <div>
                    <h2 style={{fontSize: 40}}>Admin Login</h2>
                    <form style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <label style={{display: 'flex', flexDirection: 'row', alignSelf:'center', fontSize: 20}}>Email/Username: <input name='user' value={this.state.user} style={{height: 20, width: 200}} onChange={this.handleChange}></input></label>
                        <label style={{display: 'flex', flexDirection: 'row', alignSelf:'center', fontSize: 20}}>Password: <input name='password' type='password' value={this.state.password} style={{height: 20, width: 200}} onChange={this.handleChange}></input></label>
                        <button style = {{
                            color: '#07AAFF', 
                            marginTop: 10,
                            backgroundColor: '#282c34',
                            height: 25,
                            width: 120,
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            alignSelf: 'center'}} onClick={this.authenticateUser(this.userInfo)}>Sign in</button>
                    </form>
                    
                </div>
            </div>
            
        
    }
}
export default AdminLogin