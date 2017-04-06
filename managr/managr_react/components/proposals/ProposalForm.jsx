import React from 'react';

import Textfield from '../app_components/Textfield';

class ProposalForm extends React.Component {
    render() {
        return (
            <form onSubmit="alert('you submitted the form')">
                <Textfield type="text" placeholder="Project Title" fieldName="title" />
                <Textfield type="text" placeholder="Location" fieldName="location" />
                <Textfield type="text" placeholder="Contact Number (optional)" fieldName="contact" />
                <Textfield type="text" placeholder="Budget" fieldName="budget" />
                <Textfield type="text" placeholder="Description" fieldName="description" />
                <label htmlFor="start_date">Project Start Date</label><input type="date" name="start_date" /><br/>
                <label htmlFor="end_date">Project End Date</label><input type="date" name="end_date" /><br/>
                <button className="btn btn-warning">
                    Create Project Proposal
                </button>
            </form>
        );
    }
}

export default ProposalForm;
