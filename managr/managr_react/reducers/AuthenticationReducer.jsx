
export function is_authenticated(state = 'undetermined', action) {
	switch(action.type) {
		case 'MANAGR_AUTHENTICATION_SUCCESS':
			return action.success;
		case 'MANAGR_AUTHENTICATION_FAILURE':
			return action.failure;
		case 'FORCE_AUTHENTICATION_STATE':
			return action.authState;
		default:
			return state;
	}
}
