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

export function loadProposalsFromServer(project_uuid) {
    //const request_params = { method: 'POST', body: JSON.stringify(project_uuid) };
    return (dispatch) => {
        fetch('http://managr.dev.biz:8000/bids/showproposals')
            .then((response) => {
                if(!response.ok) {
                    console.log("Server response error: " + response.ok);
                }
                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                if(data) {
                    dispatch(proposalsLoadSuccess(data));
                } else {
                    dispatch(proposalsLoadFailure("There was an error loading data from the server."));
                }
            });
    };
}
