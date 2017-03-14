import React from 'react';
import { connect } from 'react-redux';

import RegistrationForm from './RegistrationForm'

class SignupPage extends React.Component {
	render() {
		return (
			<div className="signup-container">
				<RegistrationForm />
			</div>
		);
	}
}

export default SignupPage;
