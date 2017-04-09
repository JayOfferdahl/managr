export function updateProposalFormField(field_name, field_value) {
    return {
        type: 'UPDATE_PROPOSAL_' + field_name.toUpperCase() + '_FIELD',
        field_value
    }
}

export function proposalSuccess(success = true) {
    return {
        type: 'NEW_PROPOSAL_SUCCESS',
        success
    }
}

export function proposalFailure(failure) {
    return {
        type: 'NEW_PROPOSAL_FAILURE',
        failure
    }
}

export function updateProposalForm(field_name, field_value) {
    return (dispatch) => {
        dispatch(updateProposalFormField(field_name, field_value));
    };
}


export function submitProposal(proposal_data) {
    const request_params = { method: 'POST', body: JSON.stringify(proposal_data) };
    console.log(proposal_data);
    return (dispatch) => {
        fetch('http://managr.dev.biz:8000/proposals/new', request_params)
            .then((response) => {
                if (!response.ok) {
                    // Server response was not okay
                }
                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                if (data['success']) {
                    console.log("Proposal successfully submitted.");
                    dispatch(proposalSuccess());
                } else {
                    localStorage.removeItem('managr_session_token');
                    dispatch(proposalFailure(false));
                }
            });
    };
}
