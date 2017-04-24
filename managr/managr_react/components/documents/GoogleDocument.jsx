import React from 'react';

import { connect } from 'react-redux';

import { updateCurrentlyShownGoogleDoc } from '../../actions/DocumentsActions';

class GoogleDocument extends React.Component {
    populateDocFrame(document_link) {
        this.props.updateDocFrame(document_link.target.dataset.viewLink);
    }

    render () {
        return (
            <div className="managr_document">
                <div className="managr_document-title">
                    <a id={this.props.document_uuid} data-view-link={this.props.document_view_link} onClick={this.populateDocFrame.bind(this)}><span className="glyphicon glyphicon-cloud" /> {this.props.document_title}</a>
                </div> 
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        document_title: ownProps.documentInfo[0],
        document_uuid: ownProps.documentInfo[1],
        document_view_link: ownProps.documentInfo[2],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateDocFrame: (google_doc_link) => dispatch(updateCurrentlyShownGoogleDoc(google_doc_link)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleDocument);
