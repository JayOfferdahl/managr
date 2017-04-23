import React from 'react';
import { connect } from 'react-redux';

import ErrorsList from '../app_components/ErrorsList';
import SelectGroup from '../app_components/SelectGroup';
import Textfield from '../app_components/Textfield';
import TextareaField from '../app_components/TextareaField';

import { updateCompanyForm, joinExistingCompany } from '../../actions/CompanyCreationActions';

class JoinCompanyForm extends React.Component {
    componentDidUpdate(prevProps, prevState) {
        if (this.props.join_success == true && prevProps.join_success == false) {
            this.context.router.push('/summary');
        }
    }

    handleChange(fieldUpdate) {
        this.props.updateField(fieldUpdate.target.name, fieldUpdate.target.value);
    }

    handleSubmit(submitEvent) {
        submitEvent.preventDefault();
        this.props.submitJoinCompanyForm(this.props, localStorage.getItem('managr_session_token'));
    }

    render() {
        return (
            <form className="join-company-form" onSubmit={this.handleSubmit.bind(this)}>
                <ErrorsList errors={this.props.join_errors} />
                <div className="join-company-helper-text">Enter the company key of the company you wish to join</div>
                <Textfield type="text" placeholder="Company Key" onChange={this.handleChange.bind(this)} currentText={this.props.company_key} fieldName="company_key" />
                <div className="form-group">
                    <button className="btn join-company-submit-button">
                        Join
                    </button>
                </div>
            </form>
        );
    }
}

JoinCompanyForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        company_key: state.company_key,
        join_success: state.join_success,
        join_errors: state.join_errors
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateField: (field_name, field_value) => dispatch(updateCompanyForm(field_name, field_value)),
        submitJoinCompanyForm: (form_fields_info, session_token) => dispatch(joinExistingCompany(form_fields_info, session_token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinCompanyForm);
