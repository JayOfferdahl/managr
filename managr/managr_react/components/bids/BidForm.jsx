import React from 'react';

import { connect } from 'react-redux';
import { submitBid,
         updateBid,
         cancelBidProcess,
         updateBidForm,
         resetBidForm } from '../../actions/BidActions';
import { getSessionToken } from '../../assets/js/app';

import ErrorsList from '../app_components/ErrorsList';

class BidForm extends React.Component {
    componentDidUpdate(previous_props, previous_state) {
        if(this.props.bid_form_success.success && !previous_props.bid_form_success.success)
            this.props.cancelBidProcess();
    }

    componentWillMount() {
        if(this.props.update)
            this.populateBidData.bind(this)(this.props.bid_data);
    }

    componentWillUnmount() {
        this.props.handleReset();
    }

    // Populates initial proposal form data. This method assumes the form supports an update function.
    populateBidData(bid_data) {
        // Setup dummy onChange event
        let fieldUpdate = {};
        fieldUpdate.target = {};
        
        _.forEach(bid_data, (value, key) => {
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
        this.props.submitBid(this.props, this.props.proposal_uuid);
    }

    // Submits the form for existing proposal update.
    handleUpdate(submitEvent) {
        submitEvent.preventDefault();
        this.props.updateBid(this.props, this.props.proposal_uuid);
    }

    render() {
        let submitMethod = this.props.update ? this.handleUpdate.bind(this) : this.handleSubmit.bind(this);

        return (
            <form onSubmit={submitMethod} className="proposal-form">
                <ErrorsList errors={this.props.bid_form_errors} />
                <div className="proposal-form-section proposal-form-section-left">
                    <div className="form-group">
                        <label htmlFor="contact_number">Contact Number</label>
                        <input type="text" name="contact_number" placeholder="(xxx) xxx-xxxx" maxLength="14" required 
                            onChange={this.handleChange.bind(this)} value={this.props.contact_number} />
                    </div>
                    <div className="form-group budget-form-group">
                        <label htmlFor="budget">Budget</label>
                        <div className="input-group">
                            <div className="input-group-addon">$</div>
                            <input type="number" name="budget" className="form-control" max="9999999999" min="0" required 
                                onChange={this.handleChange.bind(this)} value={this.props.budget} />
                            <div className="input-group-addon">.00</div>
                        </div>
                    </div>
                </div>

                <div className="proposal-form-section">
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

BidForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        contact_number: state.bid_form_contact_number,
        budget: state.bid_form_budget,
        start_date: state.bid_form_start_date,
        end_date: state.bid_form_end_date,
        description: state.bid_form_description,
        bid_form_errors: state.bid_form_errors,
        bid_form_success: state.bid_form_success,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateField: (field_name, field_value) => dispatch(updateBidForm(field_name, field_value)),
        updateBid: (form_fields_info, proposal_uuid) => dispatch(updateBid(form_fields_info, proposal_uuid, getSessionToken())),
        submitBid: (form_fields_info, proposal_uuid) => dispatch(submitBid(form_fields_info, proposal_uuid, getSessionToken())),
        cancelBidProcess: () => dispatch(cancelBidProcess()),
        handleReset: () => dispatch(resetBidForm()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BidForm);
