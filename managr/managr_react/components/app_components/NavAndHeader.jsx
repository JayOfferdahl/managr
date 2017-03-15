import React from 'react';
import { Col } from 'react-bootstrap';

import Header from './Header'
import NavBar from './NavBar'

class NavAndHeader extends React.Component {
    render () {
        return (
            <div className="app-container">
                <Col className="app-nav-main">
                    <NavBar/>
                </Col>
                <Col className="app-content-main">
                    <div className="flex-header">
                        <Header />
                    </div>    
                    <div className="flex-content">
                        {this.props.children}
                    </div>
                </Col>
            </div>
        );
    }
}

export default NavAndHeader;
