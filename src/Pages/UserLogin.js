import React, { Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

class UserLogin extends Component {
    state = {
        user: '',
        password: '',
        returnedUser: null
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        })
      }

      userInfo = {username: this.state.user, password: this.state.password}

    authenticate = (info) => new Promise((resolve,reject) => {
        fetch("https://my-helio-cart-api.herokuapp.com/login", {
            method: "POST",
            headers: {"content-Type": "application/json"},
            body: JSON.stringify(info)
        })
        // .then(cart => {
        //     resolve(cart.json())
        // }).catch(reject)
    })  

    authenticateUser = (userInfo) => () => {
        this.authenticate(this.userInfo);
    }  


    signInTextClick = (event) => {
        
    }

    

    render() {
        return this.state.returnedUser ? 
                <Redirect to='/user/storefront'/> 
                :
            <div className='App'>
                <div>
                    <h2 style={{fontSize: 40}}>Customer Login</h2>
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
                    <p>Don't have an account?</p>
                    <Link style={{textDecoration: 'none', fontWeight: 'bold', color: '#07AAFF', cursor: 'pointer'}} to='/user/createAccount'>Click here to create one</Link>
                </div>
            </div>
        
    }
}
export default UserLogin