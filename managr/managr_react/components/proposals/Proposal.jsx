import React from 'react';

import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { cancelBidProcess } from '../../actions/BidActions';
import { loadProposalFromServer, cancelUpdateProposal, resetProposalView } from '../../actions/ProposalActions';
import { getSessionToken } from '../../assets/js/app.jsx';

import Bid from '../bids/Bid';
import ProposalBidsList from'./ProposalBidsList';
import ProposalToolBar from './ProposalToolBar';
import ProposalLoadFailureMessage from './ProposalLoadFailureMessage';

class Proposal extends React.Component {
    componentWillMount() {
        this.props.loadProposalFromServer(this.props.params.proposal_uuid);
        this.props.resetProposalView();
    };

    componentWillReceiveProps(next_props) {
        if(next_props.params.proposal_uuid != this.props.params.proposal_uuid) {
            this.props.loadProposalFromServer(next_props.params.proposal_uuid);
            this.props.resetProposalView();
        }
    }

    render () {
        if(this.props.proposal_load_failure) {
            return <ProposalLoadFailureMessage />;
        } else {
            let content;
            if(this.props.proposal_owner) {
                content = <ProposalBidsList proposal_uuid={this.props.params.proposal_uuid} />
            } else {
                content = <Bid proposal_uuid={this.props.params.proposal_uuid} />;
            }

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
                    {content}
                </div>
            );
        }
    }
};

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
        resetProposalView: () => dispatch(resetProposalView()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Proposal);
