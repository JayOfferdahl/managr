import React from 'react';
import { connect } from 'react-redux';

import GoogleDocument from './GoogleDocument';
import UploadedDocument from './UploadedDocument';

import _ from 'lodash';

class DocumentsList extends React.Component {

    render() {
        return (
            <div className="documents-section documents-list">
                <div className="docs-list">
                    <div className="google-docs-list">
                        <h3>Google Documents</h3>
                        {
                            _.map(this.props.google_documents, (document_object) => {
                                return (
                                    <GoogleDocument documentInfo={document_object} />
                                );
                            })
                        }
                    </div>
                    <div className="new-doc-link">
                        <a onClick={this.props.new_google_doc_click}><span className="glyphicon glyphicon-plus" /> New Google Document</a>
                    </div>
                    <div className="uploaded-docs-list">
                        <h3>Uploaded Documents</h3>
                        {
                            _.map(this.props.uploaded_documents, (document_object) => {
                                return (
                                    <UploadedDocument documentInfo={document_object} />
                                );
                            })
                        }
                    </div>
                    <div className="new-doc-link" id="new-uploaded-doc-link">
                        <a onClick={this.props.new_uploaded_doc_click}><span className="glyphicon glyphicon-plus" /> Upload New Document</a>
                    </div>
                </div>
            </div>
        );
    }
}

DocumentsList.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
    return {
        google_documents: ownProps.googleDocuments,
        uploaded_documents: ownProps.uploadedDocuments,
        new_google_doc_click: ownProps.newGoogleDocClick,
        new_uploaded_doc_click: ownProps.newUploadedDocClick,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsList);
