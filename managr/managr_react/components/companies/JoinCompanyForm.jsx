import React from 'react';

import { connect } from 'react-redux';
import { updateCompanyForm, joinExistingCompany } from '../../actions/CompanyCreationActions';
import { getSessionToken } from '../../assets/js/app';

import ErrorsList from '../app_components/ErrorsList';
import SelectGroup from '../app_components/SelectGroup';
import Textfield from '../app_components/Textfield';
import TextareaField from '../app_components/TextareaField';

class JoinCompanyForm extends React.Component {
    componentDidUpdate(prevProps, prevState) {
        if (this.props.company_join_success == true && prevProps.company_join_success == false) {
            this.context.router.push('/dashboard');
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
            <form className="registration-form" onSubmit={this.handleSubmit.bind(this)}>
                <ErrorsList errors={this.props.company_join_errors} />
                <div className="join-company-helper-text">Enter the company key of the company you wish to join</div>
                <br/>
                <Textfield type="text" placeholder="Company Key" onChange={this.handleChange.bind(this)} currentText={this.props.company_key} fieldName="company_key" />
                <div className="form-group">
                    <button className="btn registration-submit-button">
                        Join Company
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
        company_join_success: state.company_join_success,
        company_join_errors: state.company_join_errors
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateField: (field_name, field_value) => dispatch(updateCompanyForm(field_name, field_value)),
        submitJoinCompanyForm: (form_fields_info) => dispatch(joinExistingCompany(form_fields_info, getSessionToken()))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinCompanyForm);
