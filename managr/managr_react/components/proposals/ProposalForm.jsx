import React from 'react';
import { connect } from 'react-redux';

import ErrorsList from '../app_components/ErrorsList'

import { submitProposal,
         updateProposal,
         updateProposalForm,
         resetProposalForm } from '../../actions/ProposalActions'

class ProposalForm extends React.Component {
    // Pushes the router to the proposal page of the newly created/updated proposal.
    componentDidUpdate(previous_props, previous_state) {
        if(this.props.proposal_form_success.success && !previous_props.proposal_form_success.success) {
            this.context.router.push("/proposal/" + this.props.proposal_form_success.proposal_uuid);
        }
    }

    // When remounting the form, populate data if it's of type update. If not, clean it.
    // TODO: If you're trying to fix the "wrong data after hitting the back/foward button" problem
    // here by using componentWillRecieveProps or whatever, good luck. I could not get it fixed.
    componentWillMount() {
        if(this.props.update) {
            this.populateProposalData.bind(this);
            this.populateProposalData(this.props.proposal_data);
        }
    }

    componentWillUnmount() {
        this.props.handleReset();
    }

    // Populates initial proposal form data. This method assumes the form supports an update function.
    populateProposalData(proposal_data) {
        // Setup dummy onChange event
        let fieldUpdate = {};
        fieldUpdate.target = {};
        
        _.forEach(proposal_data, (value, key) => {
            fieldUpdate.target.name = key;
            fieldUpdate.target.value = value;

            this.handleChange(fieldUpdate);
        })
    }

    handleChange(fieldUpdate) {
        this.props.updateField(fieldUpdate.target.name, fieldUpdate.target.value);
    }

    // Submits the form for new proposal creation
    handleSubmit(submitEvent) {
        submitEvent.preventDefault();
        this.props.submitNewProposal(this.props, this.getSessionToken());
    }

    // Submits the form for existing proposal update.
    handleUpdate(submitEvent) {
        submitEvent.preventDefault();
        this.props.updateProposal(this.props, this.getSessionToken());
    }

    getSessionToken() {
        return localStorage.getItem("managr_session_token");
    }

    render() {
        let submitMethod = this.props.update ? this.handleUpdate.bind(this) : this.handleSubmit.bind(this);

        return (
            <form onSubmit={submitMethod} className="proposal-form">
                <ErrorsList errors={this.props.proposal_form_errors} />
                <div className="proposal-form-section proposal-form-section-left">
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
                    {this.props.submitMessage}
                </button>
            </form>
        );
    }
}

ProposalForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        title: state.proposal_form_title,
        address: state.proposal_form_address,
        contact_number: state.proposal_form_contact_number,
        budget: state.proposal_form_budget,
        start_date: state.proposal_form_start_date,
        end_date: state.proposal_form_end_date,
        description: state.proposal_form_description,
        proposal_form_errors: state.proposal_form_errors,
        proposal_form_success: state.proposal_form_success,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateField: (field_name, field_value) => dispatch(updateProposalForm(field_name, field_value)),
        updateProposal: (form_fields_info, session_cookie) => dispatch(updateProposal(form_fields_info, session_cookie)),
        submitNewProposal: (form_fields_info, session_cookie) => dispatch(submitProposal(form_fields_info, session_cookie)),
        handleReset: () => dispatch(resetProposalForm()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProposalForm);
