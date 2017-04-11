import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import ErrorsList from '../app_components/ErrorsList'
import Textfield from '../app_components/Textfield';

import { updateLoginForm, loginWithServer, resetLoginForm } from '../../actions/LoginActions';

class LoginForm extends React.Component {
	componentDidUpdate(prevProps, prevState) {
		if (this.props.login_success == true && prevProps.login_success == false) {
			this.props.handleReset();
			this.context.router.push('/overview');
		}
	}

	handleChange(fieldUpdate) {
		this.props.updateField(fieldUpdate.target.name, fieldUpdate.target.value);
	}

	handleSubmit(submitEvent) {
		submitEvent.preventDefault();
		this.props.submitLogin(this.props);
	}

	render() {
		// TODO: May need to add labels to these textfields because if the browser remembers credentials, users
		// may have no idea which field is what unless they clear it. Something to think about.
		return (
			<form className="registration-form" onSubmit={this.handleSubmit.bind(this)}>
				<ErrorsList errors={this.props.login_errors} />
				<Textfield type="text" placeholder="Username/Email" onChange={this.handleChange.bind(this)} currentText={this.props.username_or_email} fieldName="username_or_email" />
				<Textfield type="password" placeholder="Password" onChange={this.handleChange.bind(this)} currentText={this.props.password} fieldName="password" />
				<div className="form-group">
					<button className="btn registration-submit-button">
						Login
					</button>
				</div>
				<LinkContainer to="/signup" className="registration-form-no-account" onClick={this.props.handleReset.bind(this)}>
	                <p>Don't have an account? <Link className="link-normal">Sign up here.</Link></p>
	            </LinkContainer>
			</form>
		);
	}
}

LoginForm.contextTypes = {
  	router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	return {
		username_or_email: state.username_or_email,
		password: state.password,
		login_errors: state.login_errors,
		login_success: state.login_success
	};
};

const mapDispatchToProps = (dispatch) => {
    return {
    	updateField: (field_name, field_value) => dispatch(updateLoginForm(field_name, field_value)),
    	submitLogin: (form_fields_info) => dispatch(loginWithServer(form_fields_info)),
    	handleReset: () => dispatch(resetLoginForm())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
