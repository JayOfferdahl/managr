import React from 'react';

import { Row, Col } from 'react-bootstrap';

import Textfield from '../app_components/Textfield';

class ProposalForm extends React.Component {
    render() {
        return (
            <form onSubmit="alert('you submitted the form')" className="proposal-form">
                <div className="proposal-form-section">
                    <div className="form-group">   
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" maxLength="255" required />
                    </div>
                    {/* TODO: Accept address, city/state, & zip code for easy project searching. */}  
                    <div className="form-group">
                        <label htmlFor="address">Location/Address</label>
                        <input type="text" name="address" maxLength="255" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact_number">Contact Number</label>
                        <input type="text" name="contact_number" placeholder="(xxx) xxx-xxxx" maxLength="14" required />
                    </div>
                </div>

                <div className="proposal-form-section">
                    <div className="form-group budget-form-group">
                        <label htmlFor="budget">Budget</label>
                        <div className="input-group">
                            <div className="input-group-addon">$</div>
                            <input type="number" className="form-control" max="9999999999" min="0" required />
                            <div className="input-group-addon">.00</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="start_date">Project Start Date</label>
                        <input type="date" name="start_date" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="end_date">Project End Date</label>
                        <input type="date" name="end_date" required />
                    </div>
                </div>

                <div className="form-group" className="proposal-form-description">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" placeholder="Write your project description here" required></textarea>
                </div>

                <button className="btn btn-warning proposal-form-submit">
                    Create Project Proposal
                </button>
            </form>
        );
    }
}

export default ProposalForm;
