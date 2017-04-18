import React from 'react';

import { connect } from 'react-redux';
import { deleteProposal, resetProposalView } from '../../actions/ProposalActions';
import { getSessionToken } from '../../assets/js/app.jsx';

class ProposalTools extends React.Component {
    // Handles the deletion of a proposal object by first confirming that the user wishes to delete it,
    // then calls the deleteProposal action.
    handleDeleteProposal(submitEvent) {
        if(!this.props.proposal_deleted && confirm("Are you sure you want to delete this proposal?")) {
            this.props.deleteProposal(this.props.proposal_uuid);
        }
    }

    handleBeginUpdateProposal() {
        this.context.router.push('/update-proposal/' + this.props.proposal_uuid);
    }

    handleCancelUpdateProposal() {
        this.context.router.push('/proposal/' + this.props.proposal_uuid);
    }

    render () {
        let toolStatus = {}, toolFunction = {};
        if(this.props.proposal_deleted) {
            toolStatus.text = "This proposal has been deleted.";
            toolStatus.class = "warning";
            toolFunction.text = this.props.update ? "Cancel" : "Edit";
        }
        // If the proposal is being updated, display a 'cancel' button along with the delete button
        else if(this.props.update) {
            toolFunction.method = this.handleCancelUpdateProposal.bind(this);
            toolFunction.text = "Cancel";
            toolStatus.text = "Update the information and click 'Update Project Proposal' to change your proposal.";
            toolStatus.class = "info";
        }
        // Else, the proposal still exists and is not being updated
        else {
            toolFunction.method = this.handleBeginUpdateProposal.bind(this);
            toolFunction.text = "Edit";
            toolStatus.text = "This proposal is live on the Managr contractor network.";
            toolStatus.class = "success";
        }

        return (
            <div className={"alert alert-" + toolStatus.class + " proposal-success"}>
                <div className="proposal-tool-buttons">
                    <button
                        className="btn btn-sm btn-default"
                        onClick={toolFunction.method}
                        disabled={this.props.proposal_deleted}>
                        {toolFunction.text}
                    </button>
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={this.handleDeleteProposal.bind(this)}
                        disabled={this.props.proposal_deleted}>
                        Delete
                    </button>
                </div>
                <p>{toolStatus.text}</p>
            </div>
        );
    }
};

ProposalTools.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        proposal_deleted: state.proposal_deleted,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteProposal: (proposal_uuid) => dispatch(deleteProposal(proposal_uuid, getSessionToken())),
        resetProposalView: () => dispatch(resetProposalView()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProposalTools);
