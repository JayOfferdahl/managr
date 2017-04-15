import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import { connect } from 'react-redux';
import { loadProposalFromServer } from '../../actions/ProposalActions';

import ProposalTools from './ProposalTools'

class Proposal extends React.Component {
    componentWillMount() {
        let session_token = localStorage.getItem("managr_session_token");
        this.props.loadProposalFromServer(this.props.params.proposal_uuid, session_token);
    };

    componentWillReceiveProps(next_props) {
        if(next_props.params.proposal_uuid != this.props.params.proposal_uuid) {
            let session_token = localStorage.getItem("managr_session_token");
            this.props.loadProposalFromServer(next_props.params.proposal_uuid, session_token);
        }
    }

    handleUpdateProposal() {
        console.log("Update proposal");
    }

    handleCreateBid() {
        console.log("Create bid");
    }

    render () {
        if(this.props.proposal_load_failure) {
            return (
                <div className="default-content">
                    <h2>Error 404: <b>Project proposal not found</b></h2>
                    <br/>
                    <p>
                        The proposal you're looking for no longer exists or never existed.&nbsp;
                        <LinkContainer to="/show-proposals">
                            <a>Try searching proposals here.</a>
                        </LinkContainer>
                    </p>
                </div>
            );
        } else {
            return (
                <div className="default-content">
                    <ProposalTools
                        owner={this.props.proposal_owner}
                        handleClick={this.props.proposal_owner == "true" ? this.handleUpdateProposal : this.handleCreateBid}
                        proposal_uuid={this.props.params.proposal_uuid}
                    />
                    <h2>Project Proposal: <b>{this.props.proposal.title}</b></h2>
                    <br/>
                    <p><b>Contact Number:</b> {this.props.proposal.contact_number}</p>
                    <p><b>Location/Address:</b> {this.props.proposal.address}</p>
                    <p><b>Budget:</b> ${this.props.proposal.budget}.00</p>
                    <p><b>Desired Start Date:</b> {this.props.proposal.start_date}</p>
                    <p><b>Desired End Date:</b> {this.props.proposal.end_date}</p>
                    <br/>
                    <p><b>Description:</b> {this.props.proposal.description}</p>
                </div>
            );
        }
    }
};

const mapStateToProps = (state) => {
    return {
        proposal: state.proposal,
        proposal_load_failure: state.proposal_load_failure,
        proposal_owner: state.proposal_owner,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadProposalFromServer: (proposal_uuid, session_token) => dispatch(loadProposalFromServer(proposal_uuid, session_token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Proposal);
