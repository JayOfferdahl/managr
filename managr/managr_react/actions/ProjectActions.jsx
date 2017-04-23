import { loadUserProjectMetadata } from './AppActions';

export function updateCreateProjectForm(field_name, field_value) {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_PROJECT_CREATION_' + field_name.toUpperCase() + '_FIELD',
            field_value
        });
    };
}

export function createProjectSuccess(success = true) {
    return {
        type: 'CREATE_PROJECT_SUCCESS',
        success
    }
}

export function createProjectFailure(errors_data) {
    return {
        type: 'CREATE_PROJECT_FAILURE',
        errors_data
    }
}

export function updateCreatedProjectUUID(new_project_uuid) {
    return {
        type: 'UPDATE_NEW_PROJECT_UUID',
        new_project_uuid
    }
}

export function fetchProjectInfoSuccess(project_info) {
    return {
        type: 'PROJECT_INFO_FETCH_SUCCESS',
        project_info
    }
}

export function createNewProject(project_data, session_token) {
    let data = JSON.parse(JSON.stringify(project_data))
    data.session_token = session_token;

    const request_params = { method: 'POST', body: JSON.stringify(data)};
    return (dispatch) => {
        fetch('http://managr.dev.biz:8000/projects/create-new-project', request_params)
        .then((response) => {
            if (!response.ok) {
                // Server response was not okay
            }
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            if (data['success']) {
                dispatch(updateCreatedProjectUUID(data['new_project_uuid']))
                dispatch(createProjectSuccess());
                dispatch(loadUserProjectMetadata(session_token));
            } else {
                dispatch(createProjectFailure(data));
            }
        });
    };
}

export function fetchProjectInfoFromServer(project_uuid, session_token) {
    let data = JSON.parse(JSON.stringify({'project_uuid': project_uuid, 'session_token': session_token}));

    const request_params = { method: 'POST', body: JSON.stringify(data)};
    return (dispatch) => {
        fetch('http://managr.dev.biz:8000/projects/get-project-info', request_params)
        .then((response) => {
            if (!response.ok) {
                // Server response was not okay
            }
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            if (data['success']) {
                dispatch(fetchProjectInfoSuccess(data));
            } else {
                console.log('Project Info fetch failed - see fetchProjectInfoFromServer function in Project Actions');
            }
        });
    };
}
