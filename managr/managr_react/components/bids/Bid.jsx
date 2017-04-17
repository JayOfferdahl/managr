import React from 'react';
import { connect } from 'react-redux';

import BidForm from './BidForm';

class Bid extends React.Component {
    render () {
        return (
        <div>
            <hr />
            <h3>Create a bid for this project</h3>
            <p>Once you create a bid for this proposal the proposal owner will have to accept it. Afterwards, you will then be notified.</p>
            <br/>
            <BidForm
                update={false}
                submitMessage="Create Bid"
                proposal_uuid={this.props.proposal_uuid}
            />
        </div>
        );
    }
}

export default Bid;
