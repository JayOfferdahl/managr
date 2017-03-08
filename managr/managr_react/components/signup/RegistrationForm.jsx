import React from 'react';
import { connect } from 'react-redux';

import ErrorsList from '../app_components/ErrorsList'
import Textfield from '../app_components/Textfield';

import { updateRegistrationForm, registerWithServer, loginAfterRegistration } from '../../actions/RegistrationActions';

class RegistrationForm extends React.Component {
	componentDidUpdate(prevProps, prevState) {
		if (this.props.registration_success == true && prevProps.registration_success == false) {
			this.context.router.push('/overview');
		}
	}

	handleChange(fieldUpdate) {
		this.props.updateField(fieldUpdate.target.name, fieldUpdate.target.value);
	}

	handleSubmit(submitEvent) {
		submitEvent.preventDefault();
		this.props.submitRegistration(this.props);
	}

	render() {
		return (
			<form className="registration-form" onSubmit={this.handleSubmit.bind(this)}>
				<ErrorsList errors={this.props.registration_errors} />
				<Textfield type="text" placeholder="First Name" onChange={this.handleChange.bind(this)} currentText={this.props.first_name} fieldName="first_name" />
				<Textfield type="text" placeholder="Last Name" onChange={this.handleChange.bind(this)} currentText={this.props.last_name} fieldName="last_name" />
				<Textfield type="text" placeholder="Username" onChange={this.handleChange.bind(this)} currentText={this.props.username} fieldName="username" />
				<Textfield type="text" placeholder="Email" onChange={this.handleChange.bind(this)} currentText={this.props.email} fieldName="email" />
				<Textfield type="password" placeholder="Password" onChange={this.handleChange.bind(this)} currentText={this.props.password} fieldName="password" />
				<Textfield type="password" placeholder="Confirm Password" onChange={this.handleChange.bind(this)} currentText={this.props.password_confirmation} fieldName="password_confirmation" />
				<div className="form-group">
					<button className="btn btn-primary btn-lg">
						Sign Up
					</button>
				</div>
			</form>
		);
	}
}

RegistrationForm.contextTypes = {
  	router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	return {
		first_name: state.first_name,
		last_name: state.last_name,
		username: state.username,
		email: state.email,
		password: state.password,
		password_confirmation: state.password_confirmation,
		registration_errors: state.registration_errors,
		registration_success: state.registration_success
	};
};

const mapDispatchToProps = (dispatch) => {
    return {
    	updateField: (field_name, field_value) => dispatch(updateRegistrationForm(field_name, field_value)),
    	submitRegistration: (form_fields_info) => dispatch(registerWithServer(form_fields_info))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
