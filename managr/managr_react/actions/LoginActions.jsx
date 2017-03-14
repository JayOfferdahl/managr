
export function updateLoginFormField(field_name, field_value) {
	return {
		type: 'UPDATE_LOGIN_' + field_name.toUpperCase() + '_FIELD',
		field_value
	};
}

export function managrLoginSuccess(success = true) {
	return {
		type: 'MANAGR_LOGIN_SUCCESS',
		success
	}
}

export function managrLoginFailure(errors_data) {
	return {
		type: 'MANAGR_LOGIN_FAILURE',
		errors_data
	}
}

export function logoutSuccess(success = true) {
	return {
		type: 'MANAGR_LOGOUT_SUCCESS',
		success
	}
}

export function cleanLoginForm() {
	return {
		type: 'CLEAN_LOGIN_FORM'
	}
}

export function cleanLogoutState() {
	return {
		type: 'CLEAN_LOGOUT_STATE'
	}
}

export function updateLoginForm(field_name, field_value) {
	return (dispatch) => {
		dispatch(updateLoginFormField(field_name, field_value));
	};
}

export function resetLoginForm() {
	return (dispatch) => {
		dispatch(cleanLoginForm());
	};
}

export function resetLogoutState() {
	return (dispatch) => {
		dispatch(cleanLogoutState());
	};
}

export function logoutOfServer(managr_session_token) {
	const request_params = { method: 'POST', body: JSON.stringify(managr_session_token) };
	return (dispatch) => {
		fetch('http://managr.dev.biz:8000/accounts/logout', request_params)
			.then((response) => {
				if (!response.ok) {
					// Server response was not okay
				}
				return response;
			})
			.then((response) => response.json())
			.then((data) => {
				dispatch(logoutSuccess());
			});
	};
}

export function loginWithServer(form_fields_info) {
	const request_params = { method: 'POST', body: JSON.stringify(form_fields_info) };
	return (dispatch) => {
		fetch('http://managr.dev.biz:8000/accounts/login', request_params)
			.then((response) => {
				if (!response.ok) {
					// Server response was not okay
				}
				return response;
			})
			.then((response) => response.json())
			.then((data) => {
				if (data['success']) {
					localStorage.setItem('managr_session_token', data['success']);
					dispatch(managrLoginSuccess());
				} else {
					dispatch(managrLoginFailure(data));
				}
			});
	};
}
