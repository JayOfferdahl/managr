import React from 'react';

import ProposalForm from './ProposalForm'

import '../../assets/css/proposal.css';

class CreateProposal extends React.Component {
    render () {
        return (
            <div className="default-content">
                <h2>Create a new project proposal</h2>
                <p>To create a new proposal, fill out the following form, and your proposal will be able to accept bids from our network!</p>
                <ProposalForm update={false} submitMessage="Create Project Proposal" />
            </div>
        )
    };
}

export default CreateProposal;