import React from 'react';
import { connect } from 'react-redux';


class DocumentViewingWindow extends React.Component {
    render() {
        return (
            <iframe id="google-doc-viewing-frame" src={this.props.currently_shown_doc_link}></iframe>
        );
    }
}

DocumentViewingWindow.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
    return {
        currently_shown_doc_link: state.currently_shown_doc_link,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentViewingWindow);
