export function milestones(state = {}, action) {
    switch(action.type) {
        case 'MILESTONES_LOAD_SUCCESS':
            return action.data;
        case 'MILESTONES_LOAD_FAILURE':
            return action.error;
        default:
            return state;
    }
}