import { combineReducers } from 'redux';
import { django_string } from './AppReducer';
import { first_name, last_name, username, email, password, password_confirmation, registration_success } from './RegistrationReducer';

export default combineReducers ({
	django_string,
	first_name,
	last_name,
	username,
	email,
	password,
	password_confirmation,
	registration_success
});
