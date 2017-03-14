export function milestonesLoadSuccess(data) {
    return {
        type: 'MILESTONES_LOAD_SUCCESS',
        data
    }
}

export function milestonesLoadFailure(error) {
    return {
        type: 'MILESTONES_LOAD_FAILURE',
        error
    }
}

export function loadMilestonesFromServer(project_uuid) {
    const request_params = { method: 'POST', body: JSON.stringify(project_uuid) };
    return (dispatch) => {
        fetch('http://managr.dev.biz:8000/milestones/get', request_params)
            .then((response) => {
                if(!response.ok) {
                    console.log("Server response error: " + response.ok);
                }
                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                if(data) {
                    dispatch(milestonesLoadSuccess(data));
                } else {
                    dispatch(milestonesLoadFailure("There was an error loading data from the server."));
                }
            });
    };
}
