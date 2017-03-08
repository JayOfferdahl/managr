
export function username_or_email(state = '', action) {
	switch(action.type) {
		case 'UPDATE_LOGIN_USERNAME_OR_EMAIL_FIELD':
			return action.field_value;
		default:
			return state;
	}
}

export function login_errors(state = {}, action) {
	switch(action.type) {
		case 'MANAGR_LOGIN_FAILURE':
			return action.errors_data;
		default:
			return state;
	}
}

export function login_success(state = false, action) {
	switch(action.type) {
		case 'MANAGR_LOGIN_SUCCESS':
			return action.success;
		default:
			return state;
	}
}
