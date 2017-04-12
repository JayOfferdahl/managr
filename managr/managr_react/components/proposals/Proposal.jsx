import React from 'react';

import { connect } from 'react-redux';
import { loadProposalFromServer } from '../../actions/ProposalActions';

import '../../assets/css/App.css';

class Proposal extends React.Component {
    componentWillMount() {
        this.props.loadProposalFromServer(this.props.params.proposal_uuid);
    };

    componentWillReceiveProps(next_props) {
        if(next_props.params.proposal_uuid != this.props.params.proposal_uuid) {
            this.props.loadProposalFromServer(next_props.params.proposal_uuid);
        }
    }

    render () {
        return (
            <div className="default-content">
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadProposalFromServer: (proposal_uuid) => dispatch(loadProposalFromServer(proposal_uuid))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Proposal);
