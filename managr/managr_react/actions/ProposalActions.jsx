import { loadUserProposalMetadata } from './AppActions';
import { bidLoadData, bidExistsOnProposal } from './BidActions';

export function updateProposalFormField(field_name, field_value) {
    return {
        type: 'PROPOSAL_FORM_UPDATE_' + field_name.toUpperCase() + '_FIELD',
        field_value
    }
}

export function createProposalSuccess(proposal_uuid) {
    return {
        type: 'PROPOSAL_FORM_CREATION_SUCCESS',
        success: true,
        proposal_uuid: proposal_uuid,
    }
}

export function createProposalFailure(failure) {
    return {
        type: 'PROPOSAL_FORM_CREATION_FAILURE',
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
        type: 'PROPOSAL_FORM_CLEAN_FORM'
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
                dispatch(createProposalSuccess(data['success']));

                // Refresh the proposal list in the navigation bar
                dispatch(loadUserProposalMetadata(session_token));
            } else {
                dispatch(createProposalFailure(data));
            }
        });
    };
}

export function updateProposal(proposal_data, session_token) {
    // Add the session token to the request body
    var data = JSON.parse(JSON.stringify(proposal_data))
    data.token = session_token;

    const request_params = { method: 'POST', body: JSON.stringify(data)};
    return (dispatch) => {
        fetch('http://managr.dev.biz:8000/proposals/update', request_params)
        .then((response) => {
            if (!response.ok) {
                // Server response was not okay
            }
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            // We can piggyback on createproposal actions since we forward to the same page.
            if (data['success']) {
                dispatch(createProposalSuccess(data['success']));

                // Refresh the proposal list in the navigation bar
                dispatch(loadUserProposalMetadata(session_token));
            } else {
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

export function proposalLoadFailure() {
    return {
        type: 'PROPOSAL_LOAD_FAILURE'
    }
}

export function proposalLoadOwner(owner) {
    return {
        type: 'PROPOSAL_LOADED_BY_OWNER',
        owner
    }
}

export function loadProposalFromServer(proposalUUID, sessionToken) {
    let data = {};
    data.proposal_uuid = proposalUUID;
    data.session_token = sessionToken;
    
    const request_params = { method: 'POST', body: JSON.stringify(data) };
    return (dispatch) => {
        fetch('http://managr.dev.biz:8000/proposals/proposal', request_params)
        .then((response) => {
            if(!response.ok) {
                dispatch(proposalLoadFailure());
            }
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            if(data['success']) {
                dispatch(proposalLoadSuccess(data['proposal']));
                dispatch(proposalLoadOwner(data['owner']));

                // If the requesting user doesn't own the proposal, check for an existing bid
                if(!data['owner'] && data['bid']['exists']) {
                    dispatch(bidExistsOnProposal(data['bid']['exists']));
                    dispatch(bidLoadData(data['bid']));
                }
            } else {
                dispatch(proposalLoadFailure());
            }
        });
    };
}

export function proposalDeleteSuccess(success = true) {
    return {
        type: 'PROPOSAL_DELETE_SUCCESS',
        success
    }
}

export function proposalDeleteFailure(failure) {
    return {
        type: 'PROPOSAL_DELETE_FAILURE',
        failure
    }
}

export function deleteProposal(proposalUUID, sessionToken) {
    let data = {};
    data.proposal_uuid = proposalUUID;
    data.session_token = sessionToken;
    
    const request_params = { method: 'POST', body: JSON.stringify(data) };
    return (dispatch) => {
        fetch('http://managr.dev.biz:8000/proposals/delete', request_params)
        .then((response) => {
            if(!response.ok) {
                console.log("Server response error: " + response.ok);
            }
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            if(data['success']) {
                dispatch(proposalDeleteSuccess());
            } else {
                dispatch(proposalDeleteFailure(data['error']));
            }
        });
    };
}

export function cleanProposalView() {
    return {
        type: 'PROPOSAL_RESET_VIEW'
    }
}

export function resetProposalView() {
    return (dispatch) => {
        dispatch(cleanProposalView());
    };
}
