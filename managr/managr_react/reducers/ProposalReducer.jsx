export function title(state = '', action) {
    switch(action.type) {
        case 'UPDATE_PROPOSAL_TITLE_FIELD':
            return action.field_value;
        case 'CLEAN_PROPOSAL_FORM':
            return '';
        default:
            return state;
    }
}

export function address(state = '', action) {
    switch(action.type) {
        case 'UPDATE_PROPOSAL_ADDRESS_FIELD':
            return action.field_value;
        case 'CLEAN_PROPOSAL_FORM':
            return '';
        default:
            return state;
    }
}

export function contact_number(state = '', action) {
    switch(action.type) {
        case 'UPDATE_PROPOSAL_CONTACT_NUMBER_FIELD':
            return action.field_value;
        case 'CLEAN_PROPOSAL_FORM':
            return '';
        default:
            return state;
    }
}

export function budget(state = '', action) {
    switch(action.type) {
        case 'UPDATE_PROPOSAL_BUDGET_FIELD':
            return action.field_value;
        case 'CLEAN_PROPOSAL_FORM':
            return '';
        default:
            return state;
    }
}

export function start_date(state = '', action) {
    switch(action.type) {
        case 'UPDATE_PROPOSAL_START_DATE_FIELD':
            return action.field_value;
        case 'CLEAN_PROPOSAL_FORM':
            return '';
        default:
            return state;
    }
}

export function end_date(state = '', action) {
    switch(action.type) {
        case 'UPDATE_PROPOSAL_END_DATE_FIELD':
            return action.field_value;
        case 'CLEAN_PROPOSAL_FORM':
            return '';
        default:
            return state;
    }
}

export function description(state = '', action) {
    switch(action.type) {
        case 'UPDATE_PROPOSAL_DESCRIPTION_FIELD':
            return action.field_value;
        case 'CLEAN_PROPOSAL_FORM':
            return '';
        default:
            return state;
    }
}

export function proposal_errors(state = {}, action) {
    switch(action.type) {
        case 'NEW_PROPOSAL_FAILURE':
            return action.failure;
        case 'CLEAN_PROPOSAL_FORM':
            return {};
        default:
            return state;
    }
}

export function proposal_success(state = false, action) {
    switch(action.type) {
        case 'NEW_PROPOSAL_SUCCESS':
            return action.success;
        case 'CLEAN_PROPOSAL_FORM':
            return false;
        default:
            return state;
    }
}
