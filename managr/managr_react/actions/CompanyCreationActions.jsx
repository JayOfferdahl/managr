export function updateCompanyCreationFormField(field_name, field_value) {
    return {
        type: 'UPDATE_COMPANY_CREATION_' + field_name.toUpperCase() + '_FIELD',
        field_value
    };
}

export function companyCreationFailure(errors_data) {
    return {
        type: 'CREATE_CONTRACTOR_COMPANY_FAILURE',
        errors_data
    }
}

export function joinCompanyFailure(errors_data) {
    return {
        type: 'JOIN_COMPANY_FAILURE',
        errors_data
    }
}

export function companyCreationSuccess(success = true) {
    return {
        type: 'CREATE_CONTRACTOR_COMPANY_SUCCESS',
        success
    }
}

export function joinCompanySuccess(success = true) {
    return {
        type: 'JOIN_COMPANY_SUCCESS',
        success
    }
}

export function resetCompanyCreationForm() {
    return {
        type: 'CLEAN_COMPANY_CREATION_FORM',
    }
}

export function resetJoinCompanyForm() {
    return {
        type: 'CLEAN_JOIN_COMPANY_FORM',
    }
}

export function updateCompanyForm(field_name, field_value) {
    return (dispatch) => {
        dispatch(updateCompanyCreationFormField(field_name, field_value));
    };
}

export function cleanCompanyCreationForm() {
    return (dispatch) => {
        dispatch(resetCompanyCreationForm());
    };
}

export function cleanJoinCompanyForm() {
    return (dispatch) => {
        dispatch(resetJoinCompanyForm());
    };
}

export function createContractorCompany(form_fields_info, session_token) {
    let request_params = JSON.parse(JSON.stringify(form_fields_info));
    request_params.session_token = session_token;
    request_params = { method: 'POST', body: JSON.stringify(request_params) };
    return (dispatch) => {
        fetch('http://managr.dev.biz:8000/companies/create-contractor-company', request_params)
        .then((response) => {
            if (!response.ok) {
                // Server response was not okay
            }
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            if (data['success']) {
                dispatch(companyCreationSuccess());
                dispatch(cleanCompanyCreationForm());
            } else {
                dispatch(companyCreationFailure(data));
            }
        });
    };
}

export function createClientCompany(form_fields_info, session_token) {
    let request_params = JSON.parse(JSON.stringify(form_fields_info));
    request_params.session_token = session_token;
    request_params = { method: 'POST', body: JSON.stringify(request_params) };
    return (dispatch) => {
        fetch('http://managr.dev.biz:8000/companies/create-client-company', request_params)
        .then((response) => {
            if (!response.ok) {
                // Server response was not okay
            }
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            if (data['success']) {
                dispatch(companyCreationSuccess());
                dispatch(cleanCompanyCreationForm());
            } else {
                dispatch(companyCreationFailure(data));
            }
        });
    };
}

export function joinExistingCompany(form_fields_info, session_token) {
    let request_params = JSON.parse(JSON.stringify(form_fields_info));
    request_params.session_token = session_token;
    request_params = { method: 'POST', body: JSON.stringify(request_params) };
    return (dispatch) => {
        fetch('http://managr.dev.biz:8000/companies/join-company', request_params)
        .then((response) => {
            if (!response.ok) {
                // Server response was not okay
            }
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            if (data['success']) {
                dispatch(joinCompanySuccess());
                dispatch(cleanJoinCompanyForm());
            } else {
                dispatch(joinCompanyFailure(data));
            }
        });
    };
}
