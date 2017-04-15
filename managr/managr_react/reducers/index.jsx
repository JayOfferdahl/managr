import { combineReducers } from 'redux';

import { first_name,
		 last_name,
		 username,
		 email,
		 password,
		 password_confirmation,
		 registration_errors,
		 registration_success } from './RegistrationReducer';

import { username_or_email,
		 login_errors,
		 login_success,
		 logout_success } from './LoginReducer';

import { is_authenticated } from './AuthenticationReducer';

import { title,
		 address,
		 contact_number,
		 budget,
		 start_date,
		 end_date,
		 description,
		 proposal_success,
		 proposal_errors,
		 proposal,
		 proposal_owner,
		 proposal_deleted } from './ProposalReducer';

import { proposals } from './ShowProposalsReducer';

import { proposal_metadata_load_errors,
		 proposal_metadata } from './AppReducer';

export default combineReducers ({
	// Registration reducers
	first_name,
	last_name,
	username,
	email,
	password,
	password_confirmation,
	registration_errors,
	registration_success,

	// Login reducers
	username_or_email,
	login_errors,
	login_success,
	logout_success,

	// Authentication reducers
	is_authenticated,

	// Proposal reducers
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
	proposal_owner,
	proposal_deleted,

	// View proposal reducers
	proposals,

	// Navigation proposal reducers
	proposal_metadata_load_errors,
	proposal_metadata,
});
