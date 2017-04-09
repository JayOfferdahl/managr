import React from 'react';
import { connect } from 'react-redux';

import ErrorsList from '../app_components/ErrorsList'

import { submitProposal, updateProposalForm } from '../../actions/ProposalActions'

class ProposalForm extends React.Component {
    handleChange(fieldUpdate) {
        this.props.updateField(fieldUpdate.target.name, fieldUpdate.target.value);
    }

    handleSubmit(submitEvent) {
        submitEvent.preventDefault();
        this.props.submitNewProposal(this.props);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)} className="proposal-form">
                <ErrorsList errors={this.props.registration_errors} />
                <div className="proposal-form-section">
                    <div className="form-group">   
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" maxLength="255" required 
                            onChange={this.handleChange.bind(this)} value={this.props.title} />
                    </div>
                    {/* TODO: Accept address, city/state, & zip code for easy project searching. */}  
                    <div className="form-group">
                        <label htmlFor="address">Location/Address</label>
                        <input type="text" name="address" maxLength="255" required 
                            onChange={this.handleChange.bind(this)} value={this.props.address} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact_number">Contact Number</label>
                        <input type="text" name="contact_number" placeholder="(xxx) xxx-xxxx" maxLength="14" required 
                            onChange={this.handleChange.bind(this)} value={this.props.contact_number} />
                    </div>
                </div>

                <div className="proposal-form-section">
                    <div className="form-group budget-form-group">
                        <label htmlFor="budget">Budget</label>
                        <div className="input-group">
                            <div className="input-group-addon">$</div>
                            <input type="number" name="budget" className="form-control" max="9999999999" min="0" required 
                                onChange={this.handleChange.bind(this)} value={this.props.budget} />
                            <div className="input-group-addon">.00</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="start_date">Project Start Date</label>
                        <input type="date" name="start_date" required 
                            onChange={this.handleChange.bind(this)} value={this.props.start_date} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="end_date">Project End Date</label>
                        <input type="date" name="end_date" required 
                            onChange={this.handleChange.bind(this)} value={this.props.end_date} />
                    </div>
                </div>

                <div className="form-group" className="proposal-form-description">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" placeholder="Write your project description here" required
                        onChange={this.handleChange.bind(this)} value={this.props.description}></textarea>
                </div>

                <button className="btn btn-warning proposal-form-submit">
                    Create Project Proposal
                </button>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        title: state.title,
        address: state.address,
        contact_number: state.contact_number,
        budget: state.budget,
        start_date: state.start_date,
        end_date: state.end_date,
        description: state.description,
        proposal_errors: state.proposal_errors,
        proposal_success: state.proposal_success,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateField: (field_name, field_value) => dispatch(updateProposalForm(field_name, field_value)),
        submitNewProposal: (form_fields_info) => dispatch(submitProposal(form_fields_info))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProposalForm);
