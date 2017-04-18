import React from 'react';
import { connect } from 'react-redux';

import { Row } from 'react-bootstrap';

import LogoutButton from '../signup/LogoutButton'

import '../../assets/css/App.css';

import logo from '../../assets/img/logo.png';
import avatar from '../../assets/img/avatar.png';

class Header extends React.Component {
    render() {
        return (
            <Row className="app-header">
                <img src={logo} className="app-logo" alt="logo" />
                <div className="avatar-section">
                    <div className="avatar-text">
                        <p><b>{this.props.user_first_and_last}</b></p>
                    </div>
                    <img src={avatar} className="avatar-icon" alt="avatar" />
                    <LogoutButton />
                </div>
            </Row>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user_first_and_last: state.user_first_and_last
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
