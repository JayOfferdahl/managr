export function company_name(state = '', action) {
    switch(action.type) {
        case 'UPDATE_COMPANY_CREATION_COMPANY_NAME_FIELD':
            return action.field_value;
        case 'CLEAN_COMPANY_CREATION_FORM':
            return '';
        default:
            return state;
    }
}

export function company_email(state = '', action) {
    switch(action.type) {
        case 'UPDATE_COMPANY_CREATION_COMPANY_EMAIL_FIELD':
            return action.field_value;
        case 'CLEAN_COMPANY_CREATION_FORM':
            return '';
        default:
            return state;
    }
}

export function company_address(state = '', action) {
    switch(action.type) {
        case 'UPDATE_COMPANY_CREATION_COMPANY_ADDRESS_FIELD':
            return action.field_value;
        case 'CLEAN_COMPANY_CREATION_FORM':
            return '';
        default:
            return state;
    }
}

export function company_city(state = '', action) {
    switch(action.type) {
        case 'UPDATE_COMPANY_CREATION_COMPANY_CITY_FIELD':
            return action.field_value;
        case 'CLEAN_COMPANY_CREATION_FORM':
            return '';
        default:
            return state;
    }
}

export function company_state(state = '', action) {
    switch(action.type) {
        case 'UPDATE_COMPANY_CREATION_COMPANY_STATE_FIELD':
            return action.field_value;
        case 'CLEAN_COMPANY_CREATION_FORM':
            return '';
        default:
            return state;
    }
}

export function company_postal_code(state = '', action) {
    switch(action.type) {
        case 'UPDATE_COMPANY_CREATION_COMPANY_POSTAL_CODE_FIELD':
            return action.field_value;
        case 'CLEAN_COMPANY_CREATION_FORM':
            return '';
        default:
            return state;
    }
}

export function company_description(state = '', action) {
    switch(action.type) {
        case 'UPDATE_COMPANY_CREATION_COMPANY_DESCRIPTION_FIELD':
            return action.field_value;
        case 'CLEAN_COMPANY_CREATION_FORM':
            return '';
        default:
            return state;
    }
}

export function company_key(state = '', action) {
    switch(action.type) {
        case 'UPDATE_COMPANY_CREATION_COMPANY_KEY_FIELD':
            return action.field_value;
        case 'CLEAN_JOIN_COMPANY':
            return '';
        default:
            return state;
    }
}

export function company_creation_success(state = false, action) {
    switch(action.type) {
        case 'CREATE_CONTRACTOR_COMPANY_SUCCESS':
            return action.success;
        case 'CLEAN_COMPANY_CREATION_FORM':
            return false;
        default:
            return state;
    }
}

export function company_creation_errors(state = {}, action) {
    switch(action.type) {
        case 'CREATE_CONTRACTOR_COMPANY_FAILURE':
            return action.errors_data;
        case 'CLEAN_COMPANY_CREATION_FORM':
            return {};
        default:
            return state;
    }
}

export function company_join_success(state = false, action) {
    switch(action.type) {
        case 'JOIN_COMPANY_SUCCESS':
            return action.success;
        case 'CLEAN_JOIN_COMPANY_FORM':
            return false;
        default:
            return state;
    }
}

export function company_join_errors(state = {}, action) {
    switch(action.type) {
        case 'JOIN_COMPANY_FAILURE':
            return action.errors_data;
        case 'CLEAN_JOIN_COMPANY_FORM':
            return {};
        default:
            return state;
    }
}
