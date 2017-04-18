import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import ErrorsList from '../app_components/ErrorsList';
import SelectGroup from '../app_components/SelectGroup';
import Textfield from '../app_components/Textfield';

import { updateRegistrationForm, registerWithServer, loginAfterRegistration, resetRegistrationForm } from '../../actions/RegistrationActions';

class RegistrationForm extends React.Component {
	componentDidUpdate(prevProps, prevState) {
		if (this.props.registration_success == true && prevProps.registration_success == false) {
			// Depending on how the user signed up, they will be redirected to different views
			switch(this.props.user_type) {
				case '0':
					this.context.router.push('/create-company-0');
					break;
				case '1':
					console.log('join contractor');
					this.context.router.push('/create-company-1');
					break;
				case '2':
					this.context.router.push('/create-company-2');
					break;
				default:
					break;
			}
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
				<SelectGroup defaultOption="Reason For Joining" options={['Creating New Contracting Company', 'Joining Existing Contracting Company', 'Joining As Client']} onChange={this.handleChange.bind(this)} fieldName="user_type" />
				<Textfield type="password" placeholder="Password" onChange={this.handleChange.bind(this)} currentText={this.props.password} fieldName="password" />
				<Textfield type="password" placeholder="Confirm Password" onChange={this.handleChange.bind(this)} currentText={this.props.password_confirmation} fieldName="password_confirmation" />
				<div className="form-group">
					<button className="btn registration-submit-button">
						Sign Up
					</button>
				</div>
				<LinkContainer to="/" className="registration-form-no-account" onClick={this.props.handleReset.bind(this)}>
                    <p>Already have an account? <Link className="link-normal">Login here.</Link></p>
                </LinkContainer>
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
		registration_success: state.registration_success,
		user_type: state.user_type
	};
};

const mapDispatchToProps = (dispatch) => {
    return {
    	updateField: (field_name, field_value) => dispatch(updateRegistrationForm(field_name, field_value)),
    	submitRegistration: (form_fields_info) => dispatch(registerWithServer(form_fields_info)),
    	handleReset: () => dispatch(resetRegistrationForm())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
