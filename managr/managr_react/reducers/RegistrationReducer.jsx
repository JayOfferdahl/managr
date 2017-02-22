
export function first_name(state = '', action) {
	switch(action.type) {
		case 'UPDATE_REGISTRATION_FIRST_NAME_FIELD':
			return action.field_value;
		default:
			return state;
	}
}

export function last_name(state = '', action) {
	switch(action.type) {
		case 'UPDATE_REGISTRATION_LAST_NAME_FIELD':
			return action.field_value;
		default:
			return state;
	}
}

export function username(state = '', action) {
	switch(action.type) {
		case 'UPDATE_REGISTRATION_USERNAME_FIELD':
			return action.field_value;
		default:
			return state;
	}
}

export function email(state = '', action) {
	switch(action.type) {
		case 'UPDATE_REGISTRATION_EMAIL_FIELD':
			return action.field_value;
		default:
			return state;
	}
}

export function password(state = '', action) {
	switch(action.type) {
		case 'UPDATE_REGISTRATION_PASSWORD_FIELD':
			return action.field_value;
		default:
			return state;
	}
}

export function password_confirmation(state = '', action) {
	switch(action.type) {
		case 'UPDATE_REGISTRATION_PASSWORD_CONFIRMATION_FIELD':
			return action.field_value;
		default:
			return state;
	}
}
