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

    // Updates state to reflect that a bid is in progress on the proposal page.
    handleBidStart() {
        this.props.beginBidProcess();
    }

    // Updates state to reflect that a bid process is not in progress on the proposal page
    handleBidCancel() {
        this.props.cancelBidProcess();
    }

    handleBeginUpdateBid() {
        console.log("Beginning the update bid process not implemented.");
    }

    handleCancelUpdateBid() {
        console.log("Canceling the update bid process not implemented.");
    }

    render () {
        let toolFunction = {}, toolStatus = {};
        // If a bid exists on this proposal, show edit/cancel & delete buttons
        if(this.props.bid_exists) {
            if(this.props.update_in_progress) {
                toolFunction.method = this.handleCancelUpdateBid.bind(this);
                toolFunction.text = "Cancel";
                toolStatus.text = "To finish updating your bid, click 'Update Bid'.";
                toolStatus.class = "info";
            }
            toolFunction.method = this.handleBeginUpdateBid.bind(this);
            toolFunction.text = "Edit";
            toolStatus.text = "Your bid is live and viewable by the proposal owner.";
            toolStatus.class = "success";

            return (
                <div className={"alert alert-" + toolStatus.class + " proposal-success"}>
                    <div className="proposal-tool-buttons">
                        <button
                            className="btn btn-sm btn-default"
                            onClick={toolFunction.method}
                            disabled={!this.props.bid_exists}>
                            {toolFunction.text}
                        </button>
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={this.handleDeleteBid.bind(this)}
                            disabled={!this.props.bid_exists}>
                            Delete
                        </button>
                    </div>
                    <p>{toolStatus.text}</p>
                </div>
            );
        }
        // There's no active bid for this proposal, allow the user to start one
        else {
            toolFunction.method = this.handleBidStart.bind(this);
            toolFunction.text = "Bid";
            toolStatus.text = "This project proposal is active. To create a bid on it, click 'Bid'.";
            toolStatus.class = "info";

            return (
                <div className={"alert alert-" + toolStatus.class + " proposal-success"}>
                    <div className="proposal-tool-buttons">
                        <button
                            className="btn btn-sm btn-default"
                            onClick={toolFunction.method}
                            disabled={this.props.bid_exists}>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        beginBidProcess: () => dispatch(beginBidProcess()),
        cancelBidProcess: () => dispatch(cancelBidProcess()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BidTools);
