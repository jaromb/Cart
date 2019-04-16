import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Admin extends Component {
    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems:'center'}}>
              <h2 style={{fontSize: 40}}>Administration</h2>
              <button style={{width: 300, height: 100, backgroundColor: '#282c34'}}><Link style ={{textDecoration: 'none', height: 100, fontSize:35, fontWeight: 'bold'}} to="/admin/inventory">Manage Inventory</Link></button>
              <button style={{width: 300, height: 100, backgroundColor: '#282c34', marginTop: 28}}><Link style ={{textDecoration: 'none', height: 100, fontSize:35, fontWeight:'bold'}} to="/admin/userManagement">Manage Users</Link></button>
            </div>
        )
    }
}
export default Admin;