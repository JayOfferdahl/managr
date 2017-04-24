import React from 'react';
import { connect } from 'react-redux';

import DocumentsList from './DocumentsList';
import DocumentViewingWindow from './DocumentViewingWindow';
import NewGoogleDocumentForm from './NewGoogleDocumentForm';
import NewUploadedDocumentForm from './NewUploadedDocumentForm';

import { fetchProjectDocuments, displayNewGoogleDocForm, displayNewUploadedDocForm } from '../../actions/DocumentsActions';
import { getSessionToken } from '../../assets/js/app.jsx';
import '../../assets/css/documents.css';

class DocumentsPage extends React.Component {
    componentWillMount() {
        this.props.fetchDocuments(this.props.params.project_uuid);
    }

    handleNewGoogleDoc(clickEvent) {
        this.props.createNewGoogleDoc();
    }

    handleNewUploadedDoc(clickEvent) {
        this.props.createNewUploadedDoc();
    }

    renderDocumentManagementSection() {
        switch (this.props.document_management_view_controller) {
            case 0:
                return <div className="documents-section documents-default-view">View, edit or create documents corresponding to the selected project</div>;
            case 1:
                return <DocumentViewingWindow />;
            case 2:
                return <NewGoogleDocumentForm projectUUID={this.props.params.project_uuid} />;
            case 3:
                return <NewUploadedDocumentForm projectUUID={this.props.params.project_uuid} />;
        }
    }

    render() {
        return (
            <div className="documents-page">
                <DocumentsList googleDocuments={this.props.google_documents} newGoogleDocClick={this.handleNewGoogleDoc.bind(this)} uploadedDocuments={this.props.uploaded_documents} newUploadedDocClick={this.handleNewUploadedDoc.bind(this)}/>
                {this.renderDocumentManagementSection.bind(this)()}
            </div>
        );
    }
}

DocumentsPage.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        google_documents: state.google_documents,
        uploaded_documents: state.uploaded_documents,
        currently_shown_doc_link: state.currently_shown_doc_link,
        document_management_view_controller: state.document_management_view_controller,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDocuments: (project_uuid) => dispatch(fetchProjectDocuments(project_uuid, getSessionToken())),
        createNewGoogleDoc: () => dispatch(displayNewGoogleDocForm()),
        createNewUploadedDoc: () => dispatch(displayNewUploadedDocForm()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsPage);
