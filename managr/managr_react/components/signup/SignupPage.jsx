import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import RegistrationForm from './RegistrationForm'

import '../../assets/css/signup.css';
import logo from '../../assets/img/logo.png';

class SignupPage extends React.Component {
	render() {
		return (
            <div className="registration-container-parent">
                <div className="registration-container">
                    <img src={logo} className="registration-logo" alt="logo" />
                    <RegistrationForm />
                    
                    <LinkContainer to="/login" className="registration-form-no-account">
                        <p>Already have an account? <Link className="link-normal">Login here.</Link></p>
                    </LinkContainer>
                </div>
            </div>
		);
	}
}

export default SignupPage;
