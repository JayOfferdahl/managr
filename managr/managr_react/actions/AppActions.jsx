export function proposalMetadataLoadSuccess(proposal_metadata) {
    return {
        type: 'PROPOSAL_METADATA_LOAD_SUCCESS',
        proposal_metadata
    }
}

export function proposalMetadataLoadFailure(failure) {
    return {
        type: 'PROPOSAL_METADATA_LOAD_FAILURE',
        failure
    }
}

export function loadUserProposalMetadata(session_token) {
    const request_params = { method: 'POST', body: JSON.stringify(session_token) };
    return (dispatch) => {
        fetch('http://managr.dev.biz:8000/proposals/get-user-proposal-metadata', request_params)
            .then((response) => {
                if (!response.ok) {
                    // Server response was not okay
                }
                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                if (data['success']) {
                    dispatch(proposalMetadataLoadSuccess(data['data']));
                } else {
                    dispatch(proposalMetadataLoadFailure(data['error']));
                }
            });
    };
}

export function bidMetadataLoadSuccess(bid_metadata) {
    return {
        type: 'BID_METADATA_LOAD_SUCCESS',
        bid_metadata
    }
}

export function bidMetadataLoadFailure(failure) {
    return {
        type: 'BID_METADATA_LOAD_FAILURE',
        failure
    }
}

export function loadUserBidMetadata(session_token) {
    const request_params = { method: 'POST', body: JSON.stringify(session_token) };
    return (dispatch) => {
        fetch('http://managr.dev.biz:8000/bids/get-user-bid-metadata', request_params)
            .then((response) => {
                if (!response.ok) {
                    // Server response was not okay
                }
                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                if (data['success']) {
                    dispatch(bidMetadataLoadSuccess(data['data']));
                } else {
                    dispatch(bidMetadataLoadFailure(data['error']));
                }
            });
    };
}