import React from 'react';
import { connect } from 'react-redux';

import Textfield from '../app_components/Textfield';

import { updateRegistrationForm, registerWithServer } from '../../actions/RegistrationActions';

class RegistrationForm extends React.Component {
	handleChange(fieldUpdate) {
		this.props.updateField(fieldUpdate.target.name, fieldUpdate.target.value);
	}

	handleSubmit(submitEvent) {
		submitEvent.preventDefault();
		this.props.submitRegistration(this.props);
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit.bind(this)}>
				<Textfield placeholder="First Name" onChange={this.handleChange.bind(this)} current_text={this.props.first_name} fieldName="first_name" />
				<Textfield placeholder="Last Name" onChange={this.handleChange.bind(this)} current_text={this.props.last_name} fieldName="last_name" />
				<Textfield placeholder="Username" onChange={this.handleChange.bind(this)} current_text={this.props.username} fieldName="username" />
				<Textfield placeholder="Email" onChange={this.handleChange.bind(this)} current_text={this.props.username} fieldName="email" />
				<Textfield placeholder="Password" onChange={this.handleChange.bind(this)} current_text={this.props.username} fieldName="password" />
				<Textfield placeholder="Confirm Password" onChange={this.handleChange.bind(this)} current_text={this.props.username} fieldName="password_confirmation" />
				<div className="form-group">
					<button className="btn btn-primary btn-lg">
						Sign Up
					</button>
				</div>
			</form>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		first_name: state.first_name,
		last_name: state.last_name,
		username: state.username,
		email: state.email,
		password: state.password,
		password_confirmation: state.password_confirmation
	};
};

const mapDispatchToProps = (dispatch) => {
    return {
    	updateField: (field_name, field_value) => dispatch(updateRegistrationForm(field_name, field_value)),
    	submitRegistration: (form_fields_info) => dispatch(registerWithServer(form_fields_info))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
