import React from 'react';

import Header from './Header'
import NavBar from './NavBar'

class NavAndHeader extends React.Component {
    render () {
        return (
            <div className="app-container">
                <div className="app-nav-main">
                    <NavBar/>
                </div>
                <div className="app-content-main">
                    <div className="flex-header">
                        <Header />
                    </div>    
                    <div className="flex-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default NavAndHeader;
