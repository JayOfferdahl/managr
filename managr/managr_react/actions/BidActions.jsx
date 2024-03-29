import { loadUserBidMetadata } from './AppActions';
import { loadProposalFromServer } from './ProposalActions';

export function bidBeginBidProcess() {
    return {
        type: 'BID_BEGIN_BID_PROCESS'
    };
}

export function bidCancelBidProcess() {
    return {
        type: 'BID_CANCEL_BID_PROCESS'
    };
}

export function beginBidProcess() {
    return (dispatch) => {
        dispatch(bidBeginBidProcess());
        dispatch(resetBidForm());
    };
}

export function cancelBidProcess() {
    return (dispatch) => {
        dispatch(bidCancelBidProcess());
        dispatch(resetBidForm());
    };
}

export function updateBidFormField(field_name, field_value) {
    return {
        type: 'BID_FORM_UPDATE_' + field_name.toUpperCase() + '_FIELD',
        field_value
    }
}

export function createBidSuccess(success = true) {
    return {
        type: 'BID_FORM_CREATION_SUCCESS',
        success
    }
}

export function createBidFailure(failure) {
    return {
        type: 'BID_FORM_CREATION_FAILURE',
        failure
    }
}

export function updateBidForm(field_name, field_value) {
    return (dispatch) => {
        dispatch(updateBidFormField(field_name, field_value));
    };
}

export function cleanBidForm() {
    return {
        type: 'BID_FORM_CLEAN_FORM'
    }
}

export function resetBidForm() {
    return (dispatch) => {
        dispatch(cleanBidForm());
    };
}

export function submitBid(bid_data, proposal_uuid, session_token) {
    // Add the session token to the request body
    var data = JSON.parse(JSON.stringify(bid_data))
    data.token = session_token;
    data.proposal_uuid = proposal_uuid;

    const request_params = { method: 'POST', body: JSON.stringify(data)};
    return (dispatch) => {
        fetch('http://managr.dev.biz:8000/bids/new', request_params)
        .then((response) => {
            if (!response.ok) {
                // Server response was not okay
            }
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            if (data['success']) {
                dispatch(createBidSuccess(data['success']));
                dispatch(cancelBidProcess());
                dispatch(loadUserBidMetadata(session_token));
                dispatch(loadProposalFromServer(proposal_uuid, session_token));
            } else {
                dispatch(createBidFailure(data));
            }
        });
    };
}

export function updateBid(bid_data, proposal_uuid, session_token) {
    // Add the session token to the request body
    var data = JSON.parse(JSON.stringify(bid_data))
    data.session_token = session_token;
    data.proposal_uuid = proposal_uuid;

    const request_params = { method: 'POST', body: JSON.stringify(data)};
    return (dispatch) => {
        fetch('http://managr.dev.biz:8000/bids/update', request_params)
        .then((response) => {
            if (!response.ok) {
                // Server response was not okay
            }
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            if (data['success']) {
                dispatch(createBidSuccess(data['success']));
                dispatch(resetBidForm());
                dispatch(loadUserBidMetadata(session_token));
                dispatch(loadProposalFromServer(proposal_uuid, session_token));
            } else {
                dispatch(createBidFailure(data));
            }
        });
    };
}

export function bidDeleteSuccess() {
    return {
        type: 'BID_DELETE_SUCCESS'
    }
}

export function bidDeleteFailure() {
    return {
        type: 'BID_DELETE_FAILURE'
    }
}

export function deleteBid(proposal_uuid, session_token) {
    let data = {};
    data.proposal_uuid = proposal_uuid;
    data.session_token = session_token;
    
    const request_params = { method: 'POST', body: JSON.stringify(data) };
    return (dispatch) => {
        fetch('http://managr.dev.biz:8000/bids/delete', request_params)
        .then((response) => {
            if(!response.ok) {
                console.log("Server response error: " + response.ok);
            }
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            if(data['success']) {
                dispatch(bidDeleteSuccess());
                dispatch(loadUserBidMetadata(session_token));
            } else {
                dispatch(bidDeleteFailure());
            }
        });
    };
}

export function bidLoadBidData(bid_data) {
    return {
        type: 'BID_LOAD_BID_DATA',
        bid_data,
    };
}

export function bidLoadBidDeclined() {
    return {
        type: 'BID_LOAD_BID_DECLINED'
    };
}

export function bidLoadProposalRemoved() {
    return {
        type: 'BID_LOAD_PROPOSAL_REMOVED'
    };
}

export function bidLoadBidValid() {
    return {
        type: 'BID_LOAD_BID_VALID'
    };
}

export function bidLoadData(bid_data) {
    return (dispatch) => {
        dispatch(bidLoadBidData(bid_data));

        if(bid_data['proposal_removed'])
            dispatch(bidLoadProposalRemoved());
        else if(bid_data['bid_declined'])
            dispatch(bidLoadBidDeclined());
        else
            dispatch(bidLoadBidValid());
    };
}

export function bidExistsOnProposal(exists) {
    return {
        type: 'BID_EXISTS_ON_PROPOSAL',
        exists,
    };
}

export function proposalsLoadSuccess(data) {
    return {
        type: 'PROPOSALS_LOAD_SUCCESS',
        data
    }
}

export function proposalsLoadFailure(error) {
    return {
        type: 'PROPOSALS_LOAD_FAILURE',
        error
    }
}

export function loadProposalsFromServer(sessionToken) {
    const request_params = { method: 'POST', body: JSON.stringify(sessionToken) };

    return (dispatch) => {
        fetch('http://managr.dev.biz:8000/bids/show-proposals', request_params)
        .then((response) => {
            if(!response.ok) {
                console.log("Server response error: " + response.ok);
            }
            return response;
        })
        .then((response) => response.json())
        .then( (data) => {
            if(data) {
                dispatch(proposalsLoadSuccess(data));
            } else {
                dispatch(proposalsLoadFailure("There was an error loading data from the server."));
            }
        });
    };
}
