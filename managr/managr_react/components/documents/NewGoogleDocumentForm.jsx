import React from 'react';
import { connect } from 'react-redux';

import { updateNewGoogleDocForm, submitNewGoogleDocToServer, pushNewDocLinkAndFrame } from '../../actions/DocumentsActions';
import { getSessionToken } from '../../assets/js/app.jsx';

import Textfield from '../app_components/Textfield';

class NewGoogleDocumentForm extends React.Component {
    componentDidUpdate(prevProps, prevState) {
        if (this.props.create_new_google_doc_link != prevProps.create_new_google_doc_link) {
            // Show new doc in iframe
            this.props.updateGoogleDocLinkAndFrame(this.props.create_new_google_doc_link);
        }
    }

    handleChange(fieldUpdate) {
        this.props.updateField(fieldUpdate.target.name, fieldUpdate.target.value);
    }

    handleSubmit(submitEvent) {
        submitEvent.preventDefault();
        this.props.submitNewGoogleDoc(this.props);
    }

    render() {
        return (
            <div className="documents-section documents-default-view">
                Provide a shareable link to a Google Document. This link can be view-only or allow editing privileges.
                <div id="new-google-doc-form">
                    <div id="new-google-doc-link">
                        <Textfield type="text" placeholder="Document Title" onChange={this.handleChange.bind(this)} currentText={this.props.new_google_doc_title} fieldName="new_google_doc_title" />
                    </div>
                    <div id="new-google-doc-link">
                        <Textfield type="text" placeholder="Google Document Link" onChange={this.handleChange.bind(this)} currentText={this.props.new_google_doc_link} fieldName="new_google_doc_link" />
                    </div>
                    <div id="new-google-doc-submit">
                        <button onClick={this.handleSubmit.bind(this)} className="btn registration-submit-button">
                            Upload
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

NewGoogleDocumentForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
    return {
        new_google_doc_link: state.new_google_doc_link,
        new_google_doc_title: state.new_google_doc_title,
        projectUUID: ownProps.projectUUID,
        create_new_google_doc_link: state.create_new_google_doc_link,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateField: (field_name, field_value) => dispatch(updateNewGoogleDocForm(field_name, field_value)),
        submitNewGoogleDoc: (form_information) => dispatch(submitNewGoogleDocToServer(form_information, getSessionToken())),
        updateGoogleDocLinkAndFrame: (new_doc_link) => dispatch(pushNewDocLinkAndFrame(new_doc_link)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewGoogleDocumentForm);
