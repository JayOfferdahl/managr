
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

export function updateLoginForm(field_name, field_value) {
	return (dispatch) => {
		dispatch(updateLoginFormField(field_name, field_value));
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