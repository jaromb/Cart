import React, { Component } from 'react';
import Storefront from './Pages/Storefront'
import Admin from './Pages/Admin'
import '../src/App.css'
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

class App extends Component {

  render() {
    return (
      <div className="App">
        
        <Router>
          <div>
            <nav className = 'App-header' style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', height: 120}}>
            <h1 style = {{fontSize: 50, fontWeight: 'bold'}}>Stuff to Eat</h1>
              <ul style={{listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', color: '#07AAFF'}}>
                <li><Link style ={{textDecoration: 'none'}} to="/Storefront">Storefront</Link></li>
                <li><Link style ={{textDecoration: 'none'}} to="/Admin">Admin</Link></li>
              </ul>
            </nav>

            
            <Route path="/Storefront" component={Storefront}/>
            <Route path="/Admin" component={Admin}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
