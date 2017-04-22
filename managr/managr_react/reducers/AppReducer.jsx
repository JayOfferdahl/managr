export function proposal_metadata_load_errors(state = {}, action) {
    switch(action.type) {
        case 'PROPOSAL_METADATA_LOAD_FAILURE':
            return action.failure;
        default:
            return state;
    }
}

export function proposal_metadata(state = {}, action) {
    switch(action.type) {
        case 'PROPOSAL_METADATA_LOAD_SUCCESS':
            return action.proposal_metadata;
        default:
            return state;
    }
}

export function project_metadata_load_errors(state = {}, action) {
    switch(action.type) {
        case 'PROJECT_METADATA_LOAD_FAILURE':
            return action.failure;
        default:
            return state;
    }
}

export function project_metadata(state = {}, action) {
    switch(action.type) {
        case 'PROJECT_METADATA_LOAD_SUCCESS':
            return action.project_metadata;
        default:
            return state;
    }
}
