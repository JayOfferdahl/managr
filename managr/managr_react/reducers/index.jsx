import { combineReducers } from 'redux';
import { first_name, last_name, username, email, password, password_confirmation, registration_errors, registration_success, user_type } from './RegistrationReducer';
import { username_or_email, login_errors, login_success, logout_success } from './LoginReducer';
import { is_authenticated } from './AuthenticationReducer';
import { title, address, contact_number, budget, start_date, end_date, description, proposal_success, proposal_errors, proposal } from './ProposalReducer';
import { company_name, company_email, city, state, postal_code, creation_success, creation_errors } from './CompanyCreationReducer';
import { proposals } from './ShowProposalsReducer';
import { proposal_metadata_load_errors, proposal_metadata } from './AppReducer';

export default combineReducers ({
	first_name,
	last_name,
	username,
	email,
	password,
	password_confirmation,
	registration_errors,
	registration_success,
	user_type,
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
	proposal,

	proposals,

	company_name,
	company_email,
	city,
	state,
	postal_code,
	creation_success,
	creation_errors

});
