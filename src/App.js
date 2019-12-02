import React, { Component } from 'react';
import Storefront from './Pages/Storefront'
import AddUser from './Pages/AddUser';
import UserLogin from './Pages/UserLogin';
import User from './Pages/User'

import '../src/App.css'
import {
  BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import {clearCookies} from './Components/Logout'

class App extends Component {
  state = {
    user: 'guest'
  }
  async componentDidMount() {
    
    const user = await sessionStorage.getItem('user')

    const checkUser = () => {
      if (user) {
      this.setState({
        user: user
      })    
  }
    checkUser()
  }
    
 }

  logout = () => {
    sessionStorage.clear();
    clearCookies();
    this.setState({
      user: 'guest'
    })
  }

  render() {
    return (
      <div className="App">
        
        <Router>
          <div>
            <nav className = 'App-header' style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', height: 120}}>
            <h1 style = {{fontSize: 50, fontWeight: 'bold'}}><Link style ={{textDecoration: 'none'}} to="/home">Stuff to Eat</Link></h1>
              <ul style={{listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center', color: '#07AAFF', fontSize: 18}}>
                <li><Link style ={{textDecoration: 'none'}} to="/">Home</Link></li>
                {this.state.user === "guest" ?
                <li><Link style ={{textDecoration: 'none'}} to="/user/login">Login</Link></li>
                :
                <li><Link onClick={this.logout}  style ={{textDecoration: 'none'}} to="/">Logout</Link></li>
                }
              </ul>
            </nav>   
            <Switch>
              <Route path="/" exact component={User}/> 
              {/* Note the use of 'exact' */}
              <Route path="/user/storefront" exact component={Storefront}/>
              <Route path="/user/login" exact component={UserLogin}/>
              <Route path="/user/create-account" exact component={AddUser}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
