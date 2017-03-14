import React from 'react';
import { connect } from 'react-redux';

import ErrorsList from '../app_components/ErrorsList'
import Textfield from '../app_components/Textfield';

//import { updateBidForm } from '../../actions/BidActions';

class BidForm extends React.Component {
	/*
	componentDidUpdate(prevProps, prevState) {
		if (this.props.registration_success == true && prevProps.registration_success == false) {
			this.context.router.push('/overview');
		}
	}
*/
	handleChange(fieldUpdate) {
		this.props.updateField(fieldUpdate.target.name, fieldUpdate.target.value);
	}

	handleSubmit(submitEvent) {
		submitEvent.preventDefault();
		this.props.submitBid(this.props);
	}

	render() {
		return (
			<form className="bid-form" onSubmit={this.handleSubmit.bind(this)}>
				<ErrorsList errors={this.props.bid_errors} />
				<Textfield type="text" placeholder="Project Name" onChange={this.handleChange.bind(this)} currentText={this.props.project_name} fieldName="project_name" />
				<Textfield type="text" placeholder="Bid Budget" onChange={this.handleChange.bind(this)} currentText={this.props.bid_budget} fieldName="bid_budget" />
				<Textfield type="text" placeholder="Bid Timeline" onChange={this.handleChange.bind(this)} currentText={this.props.bid_timeline} fieldName="bid_timeline" />
				<div className="form-group">
					<button className="btn btn-primary btn-lg">
						{this.props.button_text}
					</button>
				</div>
			</form>
		);
	}
}

BidForm.contextTypes = {
  	router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	return {
		project_name: state.project_name,
		bid_budget: state.bid_budget,
		bid_timeline: state.bid_timeline,
		bid_errors: state.bid_errors,
	  bid_success: state.bid_success
	};
};
/*
const mapDispatchToProps = (dispatch) => {
    return {
    	updateField: (field_name, field_value) => dispatch(updateBidForm(field_name, field_value)),
    	submitBid: (form_fields_info) => dispatch(updateBidWithServer(form_fields_info))
    };
};
*/
export default connect(mapStateToProps)(BidForm);

//export default BidForm;
