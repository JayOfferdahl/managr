import React from 'react';

import { connect } from 'react-redux';
import { beginBidProcess, cancelBidProcess } from '../../actions/BidActions';
import { getSessionToken } from '../../assets/js/app.jsx';

class BidTools extends React.Component {
    // Handles the deletion of a bid object by first confirming that the user wishes to delete it
    handleDeleteBid(submitEvent) {
        if(!this.props.proposal_deleted && confirm("Are you sure you want to delete this bid?")) {
            console.log("Delete bid not implemented.");
        }
    }

    // Updates state to reflect that a bid is in progress on the bid page.
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
                            onClick={this.handleDeleteBid.bind(this)}
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

BidTools.contextTypes = {
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
        deleteProposal: (proposal_uuid) => dispatch(deleteProposal(proposal_uuid, getSessionToken())),
        beginBidProcess: () => dispatch(beginBidProcess()),
        cancelBidProcess: () => dispatch(cancelBidProcess()),
        resetProposalView: () => dispatch(resetProposalView()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BidTools);
