import React from 'react';

import { connect } from 'react-redux';
import { beginBidProcess, cancelBidProcess } from '../../actions/BidActions';
import { deleteProposal, resetProposalView } from '../../actions/ProposalActions';

class ProposalTools extends React.Component {
    componentDidUpdate(prevProps, prevState) {
        if (this.props.proposal_deleted == true && prevProps.proposal_deleted == false) {
            // this.props.handleReset();
            // this.context.router.push('/summary');
            // What should we do here? Right now, it just says the proposal is deleted but stays on page.
        }
    }

    // If we're changing proposal, force update
    componentWillReceiveProps(next_props) {
        if(next_props.proposal_uuid != this.props.proposal_uuid) {
            this.props.resetProposalView();
        }
    }

    // Handles the deletion of a proposal object by first confirming that the user wishes to delete it,
    // then calls the deleteProposal action.
    handleDelete(submitEvent) {
        if(!this.props.proposal_deleted && confirm("Are you sure you want to delete this proposal?")) {
            let session_token = localStorage.getItem("managr_session_token");
            this.props.deleteProposal(this.props.proposal_uuid, session_token);
        }
    }

    // Updates state to reflect that a bid is in progress on the proposal page.
    handleBidStart() {
        this.props.beginBidProcess();
    }

    handleBidCancel() {
        this.props.cancelBidProcess();
    }

    render () {
        if(this.props.owner == "true") {
            let deleteSuccess, toolBarClass;
            if(this.props.proposal_deleted) {
                deleteSuccess = <p>This proposal has been deleted.</p>;
                toolBarClass = "alert alert-warning proposal-success";
            } else {
                deleteSuccess = <p>{this.props.text}</p>;
                toolBarClass = "alert alert-" + this.props.status + " proposal-success";
            }

            return (
                <div className={toolBarClass}>
                    <div className="proposal-tool-buttons">
                        <button
                            className="btn btn-sm btn-default"
                            onClick={this.props.handleClick}
                            disabled={this.props.proposal_deleted}
                        >
                            {this.props.handleClickName}
                        </button>
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={this.handleDelete.bind(this)}
                            disabled={this.props.proposal_deleted}
                        >
                            Delete
                        </button>
                    </div>
                    {deleteSuccess}
                </div>
            );
        } else {
            let bidStatus, toolBarClass;
            if(this.props.bid_in_progress) {
                bidStatus = {
                    handleClick: this.handleBidCancel.bind(this),
                    handleClickName: "Cancel",
                    statusText: "To submit a bid, fill out the form and click 'Create Bid'."
                };
                toolBarClass = "btn-default"
            } else {
                bidStatus = {
                    handleClick: this.handleBidStart.bind(this),
                    handleClickName: "Bid",
                    statusText: "This project proposal is active. To create a bid on it, click 'Bid'."
                };
                toolBarClass = "btn-primary"
            }
            return (
                <div className="alert alert-info proposal-success">
                    <div className="proposal-tool-buttons">
                        <button className={"btn btn-sm " + toolBarClass} onClick={bidStatus.handleClick}>
                            {bidStatus.handleClickName}
                        </button>
                    </div>
                    <p>{bidStatus.statusText}</p>
                </div>
            );
        }
    }
};

ProposalTools.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        bid_in_progress: state.bid_in_progress,
        proposal_deleted: state.proposal_deleted,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteProposal: (proposal_uuid, session_token) => dispatch(deleteProposal(proposal_uuid, session_token)),
        beginBidProcess: () => dispatch(beginBidProcess()),
        cancelBidProcess: () => dispatch(cancelBidProcess()),
        resetProposalView: () => dispatch(resetProposalView()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProposalTools);
