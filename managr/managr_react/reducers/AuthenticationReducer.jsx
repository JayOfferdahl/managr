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

export function user_first_and_last(state = '', action) {
    switch(action.type) {
        case 'UPDATE_USER_FIRST_AND_LAST':
            return action.first_and_last;
        default:
            return state;
    }
}
