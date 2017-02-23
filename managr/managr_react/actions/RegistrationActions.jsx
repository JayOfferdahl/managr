
export function updateRegistrationFormField(field_name, field_value) {
	return {
		type: 'UPDATE_REGISTRATION_' + field_name.toUpperCase() + '_FIELD',
		field_value
	};
}

export function managrRegistrationSuccess(success = true) {
	return {
		type: 'MANAGR_REGISTRATION_SUCCESS',
		success
	}
}

export function managrRegistrationFailure(errors_data) {
	return {
		type: 'MANAGR_REGISTRATION_FAILURE'
	}
}

export function updateRegistrationForm(field_name, field_value) {
	return (dispatch) => {
		dispatch(updateRegistrationFormField(field_name, field_value));
	};
}

export function registerWithServer(form_fields_info) {
	const request_params = { method: 'POST', body: JSON.stringify(form_fields_info) };
	return (dispatch) => {
		fetch('http://managr.dev.biz:8000/accounts/signup', request_params)
			.then((response) => {
				if (!response.ok) {
					// Server response was not okay
				}

				return response;
			})
			.then((response) => response.json())
			//.then((data) => dispatch(managrRegistrationSuccess(data)));
			.then((data) => {
				if (data['success']) {
					dispatch(managrRegistrationSuccess());
				} else {
					dispatch(managrRegistrationFailure(data));
				}
			});
	};
}
