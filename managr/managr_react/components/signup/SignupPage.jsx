import React from 'react';
import { connect } from 'react-redux';

import RegistrationForm from './RegistrationForm'

import '../../assets/css/signup.css';
import logo from '../../assets/img/logo.png';

class SignupPage extends React.Component {
	render() {
		return (
            <div className="registration-container-parent">
                <div className="registration-container">
                    <div className="registration-logo">
                        <img src={logo} className="registration-logo" alt="logo" />
                    </div>
                    <RegistrationForm />
                </div>
            </div>
		);
	}
}

export default SignupPage;
