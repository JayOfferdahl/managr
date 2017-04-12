
export function updateCompanyCreationFormField(field_name, field_value) {
    return {
        type: 'UPDATE_COMPANY_CREATION_' + field_name.toUpperCase() + '_FIELD',
        field_value
    };
}

export function contractorCompanyCreationFailure(errors_data) {
    return {
        type: 'CREATE_CONTRACTOR_COMPANY_FAILURE',
        errors_data
    }
}

export function contractorCompanyCreationSuccess(success = true) {
    return {
        type: 'CREATE_CONTRACTOR_COMPANY_SUCCESS',
        success
    }
}

export function updateCompanyCreationForm(field_name, field_value) {
    return (dispatch) => {
        dispatch(updateCompanyCreationFormField(field_name, field_value));
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
                    dispatch(contractorCompanyCreationSuccess());
                } else {
                    dispatch(contractorCompanyCreationFailure(data));
                }
            });
    };
}
