export function authenticationSuccess(success) {
    return {
        type: 'MANAGR_AUTHENTICATION_SUCCESS',
        success
    }
}

export function authenticationFailure(failure) {
    return {
        type: 'MANAGR_AUTHENTICATION_FAILURE',
        failure
    }
}

export function setAuthenticatedStateToParam(authState) {
    return {
        type: 'FORCE_AUTHENTICATION_STATE',
        authState
    }
}

export function updateLoggedInName(first_and_last) {
    return {
        type: 'UPDATE_USER_FIRST_AND_LAST',
        first_and_last
    }
}

export function authenticateWithManagrServer(managr_session_token) {
    const request_params = { method: 'POST', body: JSON.stringify(managr_session_token) };
    return (dispatch) => {
        fetch('http://managr.dev.biz:8000/accounts/ensure-auth', request_params)
        .then((response) => {
            if (!response.ok) {
                // Server response was not okay
            }
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            if (data['success']) {
                dispatch(authenticationSuccess(true));
                dispatch(updateLoggedInName(data['user_first_and_last']));
            } else {
                localStorage.removeItem('managr_session_token');
                dispatch(authenticationFailure(false));
            }
        });
    };
}

export function setAuthenticatedState(authState) {
    return (dispatch) => {
        dispatch(setAuthenticatedStateToParam(authState));
    };
}
