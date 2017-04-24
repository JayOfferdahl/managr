
export function fetchProjectDocumentsSuccess(documents_list) {
    return {
        type: 'POPULATE_DOCUMENTS_LIST',
        documents_list
    };
}

export function updateCurrentlyShownGoogleDoc(google_doc_link) {
    return {
        type: 'UPDATE_GOOGLE_DOC_LINK',
        google_doc_link
    }
}

export function displayNewGoogleDocForm() {
    return {
        type: 'SHOW_NEW_GOOGLE_DOC_FORM',
    }
}

export function displayNewUploadedDocForm() {
    return {
        type: 'SHOW_NEW_UPLOADED_DOC_FORM',
    }
}

export function updateNewGoogleDocForm(field_name, field_value) {
    return {
        type: 'UPDATE_NEW_GOOGLE_DOC_FORM_' + field_name.toUpperCase() + '_FIELD',
        field_value
    };
}

export function updateNewUploadedDocForm(field_name, field_value) {
    return {
        type: 'UPDATE_NEW_UPLOADED_DOC_FORM_' + field_name.toUpperCase() + '_FIELD',
        field_value
    };
}

export function createNewGoogleDocSuccess(document_link) {
    return {
        type: 'CREATE_NEW_GOOGLE_DOC_SUCCESS',
        document_link
    }
}

export function pushNewDocLinkAndFrame(new_doc_link) {
    return {
        type: 'PUSH_NEW_DOC_LINK_AND_FRAME',
        new_doc_link
    }
}

export function submitNewGoogleDocToServer(form_information, session_token) {
    let data = JSON.parse(JSON.stringify({'project_uuid': form_information.projectUUID, 'session_token': session_token, 'doc_link': form_information['new_google_doc_link'], 'doc_title': form_information['new_google_doc_title']}));

    const request_params = { method: 'POST', body: JSON.stringify(data)};
    return (dispatch) => {
        fetch('http://managr.dev.biz:8000/documents/new-google-document', request_params)
        .then((response) => {
            if (!response.ok) {
                // Server response was not okay
            }
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            if (data['success']) {
                dispatch(fetchProjectDocuments(form_information.projectUUID, session_token));
                dispatch(createNewGoogleDocSuccess(form_information['new_google_doc_link']));
            } else {
                // Failed
            }
        });
    };
}

export function submitNewUploadedDocToServer(form_information, session_token) {
    let file_reader = new FileReader()
    let data = JSON.parse(JSON.stringify({'project_uuid': form_information.projectUUID, 'session_token': session_token, 'doc_title': form_information['new_uploaded_doc_title']}));

    return (dispatch) => {
        file_reader.onload = function (event) {
            data.doc_file = event.target.result;
            const request_params = { method: 'POST', body: JSON.stringify(data)};
            console.log(request_params);

            fetch('http://managr.dev.biz:8000/documents/new-uploaded-document', request_params)
            .then((response) => {
                if (!response.ok) {
                    // Server response was not okay
                }
                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                if (data['success']) {
                    // do something else
                    dispatch(createNewUploadedDocumentSuccess());
                } else {
                    // Failed document upload
                }
            });
        }

        file_reader.readAsDataURL(form_information['new_uploaded_doc_file']);
    };
}

export function fetchProjectDocuments(project_uuid, session_token) {
    let data = JSON.parse(JSON.stringify({'project_uuid': project_uuid, 'session_token': session_token}));

    const request_params = { method: 'POST', body: JSON.stringify(data)};
    return (dispatch) => {
        fetch('http://managr.dev.biz:8000/documents/get-project-documents', request_params)
        .then((response) => {
            if (!response.ok) {
                // Server response was not okay
            }
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            if (data['success']) {
                dispatch(fetchProjectDocumentsSuccess(data['documents_data']));
            } else {
                console.log('Documents fetch failed - see fetchProjectDocuments function in DocumentsActions');
            }
        });
    };
}
