export function resetMilestonesView() {
    return {
        type: 'MILESTONES_RESET'
    }
}

export function flagMilestonesStale() {
    return {
        type: 'MILESTONES_STALE'
    }
}

export function resetMilestones() {
    return (dispatch) => {
        dispatch(resetMilestonesView());
    };
}

export function flagMilestones() {
    return (dispatch) => {
        dispatch(flagMilestonesStale());
    };
}
