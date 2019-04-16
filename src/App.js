import React, { Component } from 'react';
import Storefront from './Pages/Storefront'
import Inventory from './Pages/Inventory'
import AdminLogin from './Pages/AdminLogin'
import AddUser from './Pages/AddUser';
import UserLogin from './Pages/UserLogin';
import Home from './Pages/Home';
import User from './Pages/User'
import UserManagement from './Pages/UserManagement'
import Admin from './Pages/Admin'
import '../src/App.css'
import {
  BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";


class App extends Component {

  render() {
    return (
      <div className="App">
        
        <Router>
          <div>
            <nav className = 'App-header' style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', height: 120}}>
            <h1 style = {{fontSize: 50, fontWeight: 'bold'}}><Link style ={{textDecoration: 'none'}} to="/home">Stuff to Eat</Link></h1>
              <ul style={{listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center', color: '#07AAFF', fontSize: 18}}>
                <li><Link style ={{textDecoration: 'none'}} to="/home">Home</Link></li>
                <li><Link style ={{textDecoration: 'none'}} to="/user">Customer</Link></li>
                <li><Link style = {{textDecoration: 'none'}} to="/admin/login">Admin</Link></li>
              </ul>
            </nav>   
            <Switch>
              <Route path="/home" component={Home}/> 
              {/* Note the use of 'exact' below */}
              <Route path="/user" exact component={User}/>
              <Route path="/user/storefront" exact component={Storefront}/>
              <Route path="/user/login" exact component={UserLogin}/>
              <Route path="/user/createAccount" exact component={AddUser}/>
              <Route path="/admin/login" exact component={AdminLogin}/>
              <Route path="/admin/inventory" exact component={Inventory}/>
              <Route path="/admin/userManagement" exact component={UserManagement}/>
              <Route path="/admin" exact component={Admin}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
