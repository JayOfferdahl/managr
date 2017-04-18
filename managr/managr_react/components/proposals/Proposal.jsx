import React from 'react';

import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { cancelBidProcess } from '../../actions/BidActions';
import { loadProposalFromServer, cancelUpdateProposal } from '../../actions/ProposalActions';
import { getSessionToken } from '../../assets/js/app.jsx';

import Bid from '../bids/Bid';
import ProposalToolBar from './ProposalToolBar';
import ProposalLoadFailureMessage from './ProposalLoadFailureMessage';

class Proposal extends React.Component {
    componentWillMount() {
        this.props.loadProposalFromServer(this.props.params.proposal_uuid);
        this.props.cancelBidProcess();
        this.props.cancelUpdateProposal();
    };

    componentWillReceiveProps(next_props) {
        if(next_props.params.proposal_uuid != this.props.params.proposal_uuid) {
            this.props.loadProposalFromServer(next_props.params.proposal_uuid);
        }
    }

    render () {
        if(this.props.proposal_load_failure) {
            return <ProposalLoadFailureMessage />;
        } else {
            let bid;
            if(!this.props.proposal_owner)
                bid = <Bid proposal_uuid={this.props.params.proposal_uuid} />;

            return (
                <div className="default-content">
                    <ProposalToolBar proposal_uuid={this.props.params.proposal_uuid} update={this.props.proposal_update_in_progress} />
                    <h2>Project Proposal: <b>{this.props.proposal.title}</b></h2>
                    <br/>
                    <p><b>Contact Number:</b> {this.props.proposal.contact_number}</p>
                    <p><b>Location/Address:</b> {this.props.proposal.address}</p>
                    <p><b>Budget:</b> ${this.props.proposal.budget}.00</p>
                    <p><b>Desired Start Date:</b> {this.props.proposal.start_date}</p>
                    <p><b>Desired End Date:</b> {this.props.proposal.end_date}</p>
                    <br/>
                    <p><b>Description:</b> {this.props.proposal.description}</p>
                    {bid}
                </div>
            );
        }
    }
};

Proposal.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        proposal: state.proposal_load_success,
        proposal_load_failure: state.proposal_load_failure,
        proposal_owner: state.proposal_owner,
        proposal_update_in_progress: state.proposal_update_in_progress,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadProposalFromServer: (proposal_uuid) => dispatch(loadProposalFromServer(proposal_uuid, getSessionToken())),
        cancelBidProcess: () => dispatch(cancelBidProcess()),
        cancelUpdateProposal: () => dispatch(cancelUpdateProposal()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Proposal);
