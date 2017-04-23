export function username_or_email(state = '', action) {
    switch(action.type) {
        case 'UPDATE_LOGIN_USERNAME_OR_EMAIL_FIELD':
            return action.field_value;
        case 'CLEAN_LOGIN_FORM':
            return '';
        default:
            return state;
    }
}

export function login_errors(state = {}, action) {
    switch(action.type) {
        case 'MANAGR_LOGIN_FAILURE':
            return action.errors_data;
        case 'CLEAN_LOGIN_FORM':
            return {};
        default:
            return state;
    }
}

export function login_success(state = false, action) {
    switch(action.type) {
        case 'MANAGR_LOGIN_SUCCESS':
            return action.success;
        case 'CLEAN_LOGIN_FORM':
            return false;
        default:
            return state;
    }
}

export function logout_success(state = false, action) {
    switch(action.type) {
        case 'MANAGR_LOGOUT_SUCCESS':
            return action.success;
        case 'CLEAN_LOGOUT_STATE':
            return false;
        default:
            return state;
    }
}
