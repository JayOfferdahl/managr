import React from 'react';

import { connect } from 'react-redux';
import { deleteProposal } from '../../actions/ProposalActions';

class ProposalTools extends React.Component {
    handleDelete(submitEvent) {
        let session_token = localStorage.getItem("managr_session_token");
        this.props.deleteProposal(this.props.proposal_uuid, session_token);
    }

    render () {
        if(this.props.owner == "true") {
            return (
                <div className="alert alert-success proposal-success">
                    <div className="proposal-tool-buttons">
                        <button className="btn btn-sm btn-default" onClick={this.props.handleClick}>
                            Edit
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={this.handleDelete.bind(this)}>
                            Delete
                        </button>
                    </div>
                    <p>This proposal is live on the Managr contractor network.</p>
                </div>
            );
        } else {
            return (
                <div className="alert alert-info proposal-success">
                    <div className="proposal-tool-buttons">
                        <button className="btn btn-sm btn-primary" onClick={this.props.handleClick}>
                            Bid
                        </button>
                    </div>
                    <p>This project proposal is active. To create a bid on it, click 'Bid'.</p>
                </div>
            );
        }
    }
};

const mapStateToProps = (state) => {
    return {
        proposal_deleted: state.proposal_deleted,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteProposal: (proposal_uuid, session_token) => dispatch(deleteProposal(proposal_uuid, session_token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProposalTools);
