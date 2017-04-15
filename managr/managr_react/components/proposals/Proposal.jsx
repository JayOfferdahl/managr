import React from 'react';

import { connect } from 'react-redux';
import { loadProposalFromServer } from '../../actions/ProposalActions';

import '../../assets/css/App.css';

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

    render () {
        let activeProposal;
        if(this.props.proposal_owner == "true") {
            activeProposal = (
                <div className="alert alert-success proposal-success">
                    <div className="proposal-tool-buttons">
                        <button className="btn btn-sm btn-default">
                            Edit
                        </button>
                        <button className="btn btn-sm btn-danger">
                            Delete
                        </button>
                    </div>
                    <p>This proposal is live on the Managr contractor network.</p>
                </div>
            );
        }

        return (
            <div className="default-content">
                {activeProposal}
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
};


const mapStateToProps = (state) => {
    return {
        proposal: state.proposal,
        proposal_owner: state.proposal_owner,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadProposalFromServer: (proposal_uuid, session_token) => dispatch(loadProposalFromServer(proposal_uuid, session_token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Proposal);
