import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems:'center', marginTop: 30}}>
              <button style={{width: 300, height: 100, backgroundColor: '#282c34', display: 'flex', flexWrap: 'wrap'}}><Link style ={{textDecoration: 'none', height: 100, fontSize:40, fontWeight: 'bold'}} to="/user">{`Customer \n Portal`}</Link></button>
              <button style={{width: 300, height: 100, backgroundColor: '#282c34', marginTop: 28}}><Link style ={{textDecoration: 'none', height: 100, fontSize:40, fontWeight:'bold'}} to="/admin/login">Admin Portal</Link></button>
            </div>
        )
    }
}
export default Home;