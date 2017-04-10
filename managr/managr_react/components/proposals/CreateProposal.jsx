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
                <br/>

                <div className="todo">
                    <p>We need to complete the following tasks here:</p>
                    <ul>
                        <li><strike>Add form which accepts relevant project input.</strike></li>
                        <li><strike>Connect the form from the front end to the server (which will create the proposal object)</strike></li>
                        <li><strike>Correctly validate the form & provide meaningful error messages.</strike></li>
                        <li><strike>style the page.</strike></li>
                        <ul>
                            <li><strike>style initial form.</strike></li>
                            <li><strike>style form response/errors.</strike></li>
                        </ul>
                    </ul>
                </div>
            </Row>
        )
    };
}

export default CreateProposal;