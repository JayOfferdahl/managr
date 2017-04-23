export function reload_milestones(state = false, action) {
    switch(action.type) {
        case 'MILESTONES_RESET':
            return false;
        case 'MILESTONES_STALE':
            return true;
        default:
            return state;
    }
}
