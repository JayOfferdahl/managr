import React from 'react';
import { connect } from 'react-redux';

import { updateNewUploadedDocForm, submitNewUploadedDocToServer } from '../../actions/DocumentsActions';
import { getSessionToken } from '../../assets/js/app.jsx';

import Textfield from '../app_components/Textfield';

class NewUploadedDocumentForm extends React.Component {
    componentDidUpdate(prevProps, prevState) {
        //if (this.props.create_new_google_doc_link != prevProps.create_new_google_doc_link) {
        
        //}
    }

    handleChange(fieldUpdate) {
        if (fieldUpdate.target.name == "new_uploaded_doc_file") {
            this.props.updateField(fieldUpdate.target.name, fieldUpdate.target.files[0]);
        } else {
            this.props.updateField(fieldUpdate.target.name, fieldUpdate.target.value);
        }
    }

    handleSubmit(submitEvent) {
        submitEvent.preventDefault();
        this.props.submitNewUploadedDoc(this.props);
    }

    render() {
        return (
            <div className="documents-section documents-default-view">
                Upload a file to the cloud to be shared with other project document viewers.
                <div id="new-uploaded-doc-form">
                    <div id="new-uploaded-doc-link">
                        <Textfield type="text" placeholder="Document Title" onChange={this.handleChange.bind(this)} currentText={this.props.new_uploaded_doc_title} fieldName="new_uploaded_doc_title" />
                    </div>
                    <div id="new-uploaded-doc-file">
                        <input type="file" onChange={this.handleChange.bind(this)} name="new_uploaded_doc_file" />
                    </div>
                    <div id="new-uploaded-doc-submit">
                        <button onClick={this.handleSubmit.bind(this)} className="btn registration-submit-button">
                            Upload
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

NewUploadedDocumentForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
    return {
        new_uploaded_doc_title: state.new_uploaded_doc_title,
        new_uploaded_doc_file: state.new_uploaded_doc_file,
        projectUUID: ownProps.projectUUID,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateField: (field_name, field_value) => dispatch(updateNewUploadedDocForm(field_name, field_value)),
        submitNewUploadedDoc: (form_information) => dispatch(submitNewUploadedDocToServer(form_information, getSessionToken())),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewUploadedDocumentForm);
