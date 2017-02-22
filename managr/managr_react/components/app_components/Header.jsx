import React from 'react';
import { Row } from 'react-bootstrap';
import '../../assets/css/App.css';

import logo from '../../assets/img/logo.png';
import avatar from '../../assets/img/avatar.png';

class Header extends React.Component {
    render() {
        return (
            <Row className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div className="avatar-section">
                    <div className="avatar-text">
                        <p><b>John Smith</b></p>
                    </div>
                    <img src={avatar} className="avatar-icon" alt="avatar" />
                </div>
            </Row>
        )
    }
}

export default Header;