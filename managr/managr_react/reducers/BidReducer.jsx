export function bid_in_progress(state = false, action) {
    switch(action.type) {
        case 'BID_BEGIN_BID_PROCESS':
            return true;
        case 'BID_CANCEL_BID_PROCESS':
            return false;
        default:
            return state;
    }
}

export function bid_form_contact_number(state = '', action) {
    switch(action.type) {
        case 'BID_FORM_UPDATE_CONTACT_NUMBER_FIELD':
            return action.field_value;
        case 'BID_FORM_CLEAN_FORM':
            return '';
        default:
            return state;
    }
}

export function bid_form_budget(state = '', action) {
    switch(action.type) {
        case 'BID_FORM_UPDATE_BUDGET_FIELD':
            return action.field_value;
        case 'BID_FORM_CLEAN_FORM':
            return '';
        default:
            return state;
    }
}

export function bid_form_start_date(state = '', action) {
    switch(action.type) {
        case 'BID_FORM_UPDATE_START_DATE_FIELD':
            return action.field_value;
        case 'BID_FORM_CLEAN_FORM':
            return '';
        default:
            return state;
    }
}

export function bid_form_end_date(state = '', action) {
    switch(action.type) {
        case 'BID_FORM_UPDATE_END_DATE_FIELD':
            return action.field_value;
        case 'BID_FORM_CLEAN_FORM':
            return '';
        default:
            return state;
    }
}

export function bid_form_description(state = '', action) {
    switch(action.type) {
        case 'BID_FORM_UPDATE_DESCRIPTION_FIELD':
            return action.field_value;
        case 'BID_FORM_CLEAN_FORM':
            return '';
        default:
            return state;
    }
}

export function bid_form_success(state = {}, action) {
    switch(action.type) {
        case 'BID_FORM_CREATION_SUCCESS':
            return {
                success: true,
                proposal_uuid: action.proposal_uuid,
            };
        case 'BID_FORM_CLEAN_FORM':
            return {};
        default:
            return state;
    }
}

export function bid_form_errors(state = {}, action) {
    switch(action.type) {
        case 'BID_FORM_CREATION_FAILURE':
            return action.failure;
        case 'BID_FORM_CLEAN_FORM':
            return {};
        default:
            return state;
    }
}

export function bid_exists_on_proposal(state = false, action) {
    switch(action.type) {
        case 'BID_EXISTS_ON_PROPOSAL':
            return action.exists;
        default:
            return state;
    }
}

export function bid_data(state = {}, action) {
    switch(action.type) {
        case 'BID_LOAD_BID_DATA':
            return action.bid_data;
        default:
            return state;
    }
}
