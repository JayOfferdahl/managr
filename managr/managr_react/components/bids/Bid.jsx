import React from 'react';
import { connect } from 'react-redux';

import BidForm from './BidForm';

class Bid extends React.Component {
    render () {
        // If the bid exists & we're not updating it, show the bid in text
        if(this.props.bid_exists && !this.props.bid_in_progress) {
            return (
                <div>
                    <hr />
                    <h3>You have created a bid for this project proposal:</h3>
                    <br/>
                    <p><b>Contact Number:</b> {this.props.bid_data.contact_number}</p>
                    <p><b>Budget:</b> ${this.props.bid_data.budget}.00</p>
                    <p><b>Projected Start Date:</b> {this.props.bid_data.start_date}</p>
                    <p><b>Projected End Date:</b> {this.props.bid_data.end_date}</p>
                    <br/>
                    <p><b>Description:</b> {this.props.bid_data.description}</p>
                </div>
            );
        } else if(this.props.bid_in_progress) {
            let bidFormProps = {};
            if(this.props.bid_exists) {
                bidFormProps.title = "Update your existing bid";
                bidFormProps.text = "Your updated bid will be viewable by the proposal owner."
                bidFormProps.submit = "Update Bid"
            } else {
                bidFormProps.title = "Create a bid for this project";
                bidFormProps.text = "Once you create a bid for this proposal the proposal owner will have to accept it. Afterwards, you will then be nitified.";
                bidFormProps.submit = "Create Bid"
            }
            return (
                <div>
                    <hr />
                    <h3>{bidFormProps.title}</h3>
                    <p>{bidFormProps.text}</p>
                    <br/>
                    <BidForm
                        update={this.props.bid_exists}
                        bid_data={this.props.bid_data}
                        submitMessage={bidFormProps.submit}
                        proposal_uuid={this.props.proposal_uuid}
                    />
                </div>
            );
        } else {
            return false;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        bid_data: state.bid_data,
        bid_exists: state.bid_exists_on_proposal,
        bid_in_progress: state.bid_in_progress,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Bid);
