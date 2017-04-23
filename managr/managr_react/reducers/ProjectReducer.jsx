export function create_project_name(state = '', action) {
    switch(action.type) {
        case 'UPDATE_PROJECT_CREATION_CREATE_PROJECT_NAME_FIELD':
            return action.field_value;
        default:
            return state;
    }
}

export function create_project_description(state = '', action) {
    switch(action.type) {
        case 'UPDATE_PROJECT_CREATION_CREATE_PROJECT_DESCRIPTION_FIELD':
            return action.field_value;
        default:
            return state;
    }
}

export function create_project_budget(state = '', action) {
    switch(action.type) {
        case 'UPDATE_PROJECT_CREATION_CREATE_PROJECT_BUDGET_FIELD':
            return action.field_value;
        default:
            return state;
    }
}

export function create_project_success(state = false, action) {
    switch (action.type) {
        case 'CREATE_PROJECT_SUCCESS':
            return action.success;
        default:
            return state;
    }
}

export function create_project_errors(state = {}, action) {
    switch (action.type) {
        case 'CREATE_PROJECT_FAILURE':
            return action.errors_data;
        default:
            return state;
    }
}

export function new_project_uuid(state = '', action) {
    switch(action.type) {
        case 'UPDATE_NEW_PROJECT_UUID':
            return action.new_project_uuid;
        default:
            return state;
    }
}
