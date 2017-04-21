import React from 'react';

import { connect } from 'react-redux';
import { beginBidProcess,
         cancelBidProcess,
         deleteBid } from '../../actions/BidActions';
import { getSessionToken } from '../../assets/js/app.jsx';

class BidTools extends React.Component {
    // Handles the deletion of a bid object by first confirming that the user wishes to delete it
    handleDeleteBid(submitEvent) {
        if(!this.props.proposal_deleted && confirm("Are you sure you want to delete this bid?")) {
            this.props.deleteBid(this.props.proposal_uuid);
        }
    }

    render () {
        let toolFunction = {}, toolStatus = {};
        // If a bid exists on this proposal, show edit/cancel & delete buttons
        if(this.props.bid_exists) {
            let toolsDisabled = this.props.proposal_removed;

            if(toolsDisabled) {
                toolFunction.method = null;
                toolFunction.text = "Edit";
                toolStatus.text = "This proposal is no longer active. You can safely delete this bid.";
                toolStatus.class = "danger";
            } else if(this.props.bid_in_progress) {
                toolFunction.method = this.props.cancelBidProcess;
                toolFunction.text = "Cancel";
                toolStatus.text = "To finish updating your bid, click 'Update Bid'.";
                toolStatus.class = "info";
            } else {
                toolFunction.method = this.props.beginBidProcess;
                toolFunction.text = "Edit";
                
                if(this.props.bid_declined) {
                    toolStatus.text = "Your bid has been declined by the proposal owner, please update and resubmit.";
                    toolStatus.class = "warning";
                } else {
                    toolStatus.text = "Your bid is live and viewable by the proposal owner.";
                    toolStatus.class = "success";
                }
            }

            return (
                <div className={"alert alert-" + toolStatus.class + " proposal-success"}>
                    <div className="proposal-tool-buttons">
                        <button
                            className="btn btn-sm btn-default"
                            onClick={toolFunction.method}
                            disabled={toolsDisabled}>
                            {toolFunction.text}
                        </button>
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={this.handleDeleteBid.bind(this)}>
                            Delete
                        </button>
                    </div>
                    <p>{toolStatus.text}</p>
                </div>
            );
        }
        // There's no active bid for this proposal, allow the user to start one
        else {
            if(!this.props.bid_in_progress) {
                toolFunction.method = this.props.beginBidProcess;
                toolFunction.text = "Bid";
                toolStatus.text = "This project proposal is active. To create a bid on it, click 'Bid'.";
            }
            else {
                toolFunction.method = this.props.cancelBidProcess;
                toolFunction.text = "Cancel";
                toolStatus.text = "To finish creating a bid, fill out the form and click 'Create Bid'.";
            }

            return (
                <div className={"alert alert-info proposal-success"}>
                    <div className="proposal-tool-buttons">
                        <button
                            className="btn btn-sm btn-default"
                            onClick={toolFunction.method}>
                            {toolFunction.text}
                        </button>
                    </div>
                    <p>{toolStatus.text}</p>
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
        bid_exists: state.bid_exists_on_proposal,
        bid_declined: state.bid_declined,
        proposal_removed: state.proposal_removed,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteBid: (proposal_uuid) => dispatch(deleteBid(proposal_uuid, getSessionToken())),
        beginBidProcess: () => dispatch(beginBidProcess()),
        cancelBidProcess: () => dispatch(cancelBidProcess()),
        beginUpdateBidProcess: () => dispatch(beginUpdateBidProcess()),
        cancelUpdateBidProcess: () => dispatch(cancelUpdateBidProcess()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BidTools);
