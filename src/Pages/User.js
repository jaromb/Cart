import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class User extends Component {
    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems:'center'}}>
              <h2 style={{fontSize: 40}}>Customer Portal</h2>
              <button style={{width: 300, height: 50, backgroundColor: '#282c34'}}><Link style ={{textDecoration: 'none', height: 100, fontSize:35, fontWeight: 'bold'}} to="/user/storefront">Shop as Guest</Link></button>
              <button style={{width: 300, height: 50, backgroundColor: '#282c34', marginTop: 28}}><Link style ={{textDecoration: 'none', height: 100, fontSize:35, fontWeight:'bold'}} to="/user/login">Customer Login</Link></button>
              <button style={{width: 300, height: 50, backgroundColor: '#282c34', marginTop: 28}}><Link style ={{textDecoration: 'none', height: 100, fontSize:35, fontWeight:'bold'}} to="/user/create-account">Create Account</Link></button>
            </div>
        )
    }
}
export default User;