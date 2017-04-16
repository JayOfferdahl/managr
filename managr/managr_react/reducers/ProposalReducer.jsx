export function proposal_form_title(state = '', action) {
    switch(action.type) {
        case 'PROPOSAL_FORM_UPDATE_TITLE_FIELD':
            return action.field_value;
        case 'PROPOSAL_FORM_CLEAN_FORM':
            return '';
        default:
            return state;
    }
}

export function proposal_form_address(state = '', action) {
    switch(action.type) {
        case 'PROPOSAL_FORM_UPDATE_ADDRESS_FIELD':
            return action.field_value;
        case 'PROPOSAL_FORM_CLEAN_FORM':
            return '';
        default:
            return state;
    }
}

export function proposal_form_contact_number(state = '', action) {
    switch(action.type) {
        case 'PROPOSAL_FORM_UPDATE_CONTACT_NUMBER_FIELD':
            return action.field_value;
        case 'PROPOSAL_FORM_CLEAN_FORM':
            return '';
        default:
            return state;
    }
}

export function proposal_form_budget(state = '', action) {
    switch(action.type) {
        case 'PROPOSAL_FORM_UPDATE_BUDGET_FIELD':
            return action.field_value;
        case 'PROPOSAL_FORM_CLEAN_FORM':
            return '';
        default:
            return state;
    }
}

export function proposal_form_start_date(state = '', action) {
    switch(action.type) {
        case 'PROPOSAL_FORM_UPDATE_START_DATE_FIELD':
            return action.field_value;
        case 'PROPOSAL_FORM_CLEAN_FORM':
            return '';
        default:
            return state;
    }
}

export function proposal_form_end_date(state = '', action) {
    switch(action.type) {
        case 'PROPOSAL_FORM_UPDATE_END_DATE_FIELD':
            return action.field_value;
        case 'PROPOSAL_FORM_CLEAN_FORM':
            return '';
        default:
            return state;
    }
}

export function proposal_form_description(state = '', action) {
    switch(action.type) {
        case 'PROPOSAL_FORM_UPDATE_DESCRIPTION_FIELD':
            return action.field_value;
        case 'PROPOSAL_FORM_CLEAN_FORM':
            return '';
        default:
            return state;
    }
}

export function proposal_form_success(state = false, action) {
    switch(action.type) {
        case 'PROPOSAL_FORM_CREATION_SUCCESS':
            return action.success;
        case 'PROPOSAL_FORM_CLEAN_FORM':
            return false;
        default:
            return state;
    }
}

export function proposal_form_errors(state = {}, action) {
    switch(action.type) {
        case 'PROPOSAL_FORM_CREATION_FAILURE':
            return action.failure;
        case 'PROPOSAL_FORM_CLEAN_FORM':
            return {};
        default:
            return state;
    }
}

export function proposal_load_success(state = {}, action) {
    switch(action.type) {
        case 'PROPOSAL_LOAD_SUCCESS':
            return action.data;
        default:
            return state;
    }
}

export function proposal_load_failure(state = '', action) {
    switch(action.type) {
        case 'PROPOSAL_LOAD_FAILURE':
            return true;
        case 'PROPOSAL_LOAD_SUCCESS':
            return false;
        default:
            return false;
    }
}

export function proposal_owner(state = '', action) {
    switch(action.type) {
        case 'PROPOSAL_LOADED_BY_OWNER':
            if(action.owner == false)
                return "false";
            else
                return "true";
        default:
            return state;
    }
}

export function proposal_deleted(state = '', action) {
    switch(action.type) {
        case 'PROPOSAL_DELETE_SUCCESS':
            return action.success;
        case 'PROPOSAL_DELETE_FAILURE':
            return action.failure;
        case 'PROPOSAL_RESET_VIEW':
            return false;
        default:
            return state;
    }
}
