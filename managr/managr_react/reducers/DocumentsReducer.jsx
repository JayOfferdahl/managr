
export function google_documents(state = {}, action) {
    switch(action.type) {
        case 'POPULATE_DOCUMENTS_LIST':
            return action.documents_list.google_documents;
        default:
            return state;
    }
}

export function uploaded_documents(state = {}, action) {
    switch(action.type) {
        case 'POPULATE_DOCUMENTS_LIST':
            return action.documents_list.uploaded_documents;
        default:
            return state;
    }
}

export function currently_shown_doc_link(state = '', action) {
    switch(action.type) {
        case 'UPDATE_GOOGLE_DOC_LINK':
            return action.google_doc_link;
        case 'PUSH_NEW_DOC_LINK_AND_FRAME':
            return action.new_doc_link;
        default:
            return state;
    }
}

export function document_management_view_controller(state = 0, action) {
    switch(action.type) {
        case 'UPDATE_GOOGLE_DOC_LINK':
            return 1;
        case 'PUSH_NEW_DOC_LINK_AND_FRAME':
            return 1;
        case 'SHOW_NEW_GOOGLE_DOC_FORM':
            return 2;
        case 'SHOW_NEW_UPLOADED_DOC_FORM':
            return 3;
        case 'CREATE_NEW_UPLOADED_DOC_SUCCESS':
            return 0;
        default:
            return state;
    }
}

export function new_google_doc_link(state = '', action) {
    switch(action.type) {
        case 'UPDATE_NEW_GOOGLE_DOC_FORM_NEW_GOOGLE_DOC_LINK_FIELD':
            return action.field_value;
        case 'CREATE_NEW_GOOGLE_DOC_SUCCESS':
            return '';
        default:
            return state;
    }
}

export function new_google_doc_title(state = '', action) {
    switch(action.type) {
        case 'UPDATE_NEW_GOOGLE_DOC_FORM_NEW_GOOGLE_DOC_TITLE_FIELD':
            return action.field_value;
        case 'CREATE_NEW_GOOGLE_DOC_SUCCESS':
            return '';
        default:
            return state;
    }
}

export function create_new_google_doc_link(state = '', action) {
    switch(action.type) {
        case 'CREATE_NEW_GOOGLE_DOC_SUCCESS':
            return action.document_link;
        default:
            return state;
    }
}

export function new_uploaded_doc_title(state = '', action) {
    switch(action.type) {
        case 'UPDATE_NEW_UPLOADED_DOC_FORM_NEW_UPLOADED_DOC_TITLE_FIELD':
            return action.field_value;
        default:
            return state;
    }
}

export function new_uploaded_doc_file(state = '', action) {
    switch(action.type) {
        case 'UPDATE_NEW_UPLOADED_DOC_FORM_NEW_UPLOADED_DOC_FILE_FIELD':
            return action.field_value;
        default:
            return state;
    }
}
