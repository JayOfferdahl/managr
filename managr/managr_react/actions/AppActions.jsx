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

export function projectMetadataLoadSuccess(project_metadata) {
    return {
        type: 'PROJECT_METADATA_LOAD_SUCCESS',
        project_metadata
    }
}

export function projectMetadataLoadFailure(failure) {
    return {
        type: 'PROJECT_METADATA_LOAD_FAILURE',
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
                    console.log("Proposal metadata loaded. (Debug statement - AppActions.jsx)");
                    dispatch(proposalMetadataLoadSuccess(data['data']));
                } else {
                    console.log("Error loading proposal metadata: %o (Debug statement - AppActions.jsx)", data);
                    dispatch(proposalMetadataLoadFailure(data['error']));
                }
            });
    };
}

export function loadUserProjectMetadata(session_token) {
    const request_params = { method: 'POST', body: JSON.stringify(session_token) };
    return (dispatch) => {
        fetch('http://managr.dev.biz:8000/projects/get-user-project-metadata', request_params)
            .then((response) => {
                if (!response.ok) {
                    // Server response was not okay
                }
                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                if (data['success']) {
                    dispatch(projectMetadataLoadSuccess(data['data']));
                } else {
                    dispatch(projectMetadataLoadFailure(data['error']));
                }
            });
    };
}
