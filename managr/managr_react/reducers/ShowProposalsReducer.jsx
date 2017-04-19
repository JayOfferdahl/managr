export function proposals(state = [], action) {
    switch(action.type) {
        case 'PROPOSALS_LOAD_SUCCESS':
            return action.data;
        default:
            return state;
    }
}
