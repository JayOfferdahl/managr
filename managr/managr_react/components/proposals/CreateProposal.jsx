import React from 'react';
import { Row } from 'react-bootstrap';

import ProposalForm from './ProposalForm'

import '../../assets/css/proposal.css';

class CreateProposal extends React.Component {
    render () {
        return (
            <Row className="proposal-content">
                <h2>Create a new project proposal</h2>
                <p>To create a new proposal, fill out the following form, and your proposal will be able to accept bids from our network!</p>
                <ProposalForm />
            </Row>
        )
    };
}

export default CreateProposal;