import { combineReducers } from 'redux';
import { first_name, last_name, username, email, password, password_confirmation, registration_errors, registration_success } from './RegistrationReducer';
import { username_or_email, login_errors, login_success, logout_success } from './LoginReducer';
import { is_authenticated } from './AuthenticationReducer';
import { title, address, contact_number, budget, start_date, end_date, description, proposal_success, proposal_errors } from './ProposalReducer';

export default combineReducers ({
	first_name,
	last_name,
	username,
	email,
	password,
	password_confirmation,
	registration_errors,
	registration_success,
	username_or_email,
	login_errors,
	login_success,
	logout_success,
	is_authenticated,

	title,
	address,
	contact_number,
	budget,
	start_date,
	end_date,
	description,
	proposal_success,
	proposal_errors,
});
