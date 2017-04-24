import React from 'react';

import { connect } from 'react-redux';

class UploadedDocument extends React.Component {
    render () {
        return (
            <div className="managr_document" id={this.props.document_uuid}>
                <div className="managr_document-title">
                    <a><span className="glyphicon glyphicon-file" /> {this.props.document_title}</a>
                </div> 
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        document_title: ownProps.documentInfo[0],
        document_uuid: ownProps.documentInfo[1],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadedDocument);
