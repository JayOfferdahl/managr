import { loadUserProposalMetadata } from './AppActions';

export function updateProposalFormField(field_name, field_value) {
    return {
        type: 'UPDATE_PROPOSAL_' + field_name.toUpperCase() + '_FIELD',
        field_value
    }
}

export function createProposalSuccess(success = true) {
    return {
        type: 'NEW_PROPOSAL_SUCCESS',
        success
    }
}

export function createProposalFailure(failure) {
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

export function cleanProposalForm() {
    return {
        type: 'CLEAN_PROPOSAL_FORM'
    }
}

export function resetProposalForm() {
    return (dispatch) => {
        dispatch(cleanProposalForm());
    };
}

export function submitProposal(proposal_data, session_token) {
    // Add the session token to the request body
    var data = JSON.parse(JSON.stringify(proposal_data))
    data.token = session_token;

    const request_params = { method: 'POST', body: JSON.stringify(data)};
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
                    console.log("Proposal successfully submitted. (Debug statement - ProposalActions.jsx)");
                    dispatch(createProposalSuccess());

                    // Refresh the proposal list in the navigation bar
                    dispatch(loadUserProposalMetadata(session_token));
                } else {
                    console.log("Error: %o (Debug statement - ProposalActions.jsx)", data);
                    dispatch(createProposalFailure(data));
                }
            });
    };
}

export function proposalLoadSuccess(data) {
    return {
        type: 'PROPOSAL_LOAD_SUCCESS',
        data
    }
}

export function proposalLoadFailure(error) {
    return {
        type: 'PROPOSAL_LOAD_FAILURE',
        error
    }
}

export function loadProposalFromServer(proposalID) {
  const request_params = { method: 'POST', body: proposalID };
    return (dispatch) => {
        fetch('http://managr.dev.biz:8000/proposals/proposal', request_params)
            .then((response) => {
                if(!response.ok) {
                    console.log("Server response error: " + response.ok);
                }
                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                if(data['success']) {
                    dispatch(proposalLoadSuccess(data['proposal']));
                } else {
                    dispatch(proposalLoadFailure("There was an error loading data from the server."));
                }
            });
    };
}
