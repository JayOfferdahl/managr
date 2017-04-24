import React from 'react';

import { connect } from 'react-redux';
import { updateCompanyForm, createClientCompany } from '../../actions/CompanyCreationActions';
import { states_array } from '../../assets/js/StatesArray';
import { getSessionToken } from '../../assets/js/app';

import ErrorsList from '../app_components/ErrorsList';
import SelectGroup from '../app_components/SelectGroup';
import Textfield from '../app_components/Textfield';
import TextareaField from '../app_components/TextareaField';

// import { updateRegistrationForm, registerWithServer, loginAfterRegistration, resetRegistrationForm } from '../../actions/RegistrationActions';

class ClientCompanyCreationForm extends React.Component {
    componentDidUpdate(prevProps, prevState) {
        if (this.props.company_creation_success == true && prevProps.company_creation_success == false) {
            // Push to summary for now, probably want to redirect to some sort of company view in the future
            this.context.router.push('/dashboard');
        }
    }

    handleChange(fieldUpdate) {
        this.props.updateField(fieldUpdate.target.name, fieldUpdate.target.value);
    }

    handleSubmit(submitEvent) {
        submitEvent.preventDefault();
        this.props.submitCompanyCreation(this.props);
    }

    render() {
        return (
            <form className="registration-form" onSubmit={this.handleSubmit.bind(this)}>
                <ErrorsList errors={this.props.company_creation_errors} />
                <Textfield type="text" placeholder="Company Name" onChange={this.handleChange.bind(this)} currentText={this.props.company_name} fieldName="company_name" />
                <Textfield type="text" placeholder="Company Email" onChange={this.handleChange.bind(this)} currentText={this.props.company_email} fieldName="company_email" />
                <Textfield type="text" placeholder="Address" onChange={this.handleChange.bind(this)} currentText={this.props.company_address} fieldName="company_address" />
                <Textfield type="text" placeholder="City" onChange={this.handleChange.bind(this)} currentText={this.props.company_city} fieldName="company_city" />
                <SelectGroup defaultOption="State" options={states_array} onChange={this.handleChange.bind(this)} fieldName="company_state" />
                <Textfield type="text" placeholder="Postal Code" onChange={this.handleChange.bind(this)} currentText={this.props.company_postal_code} fieldName="company_postal_code" />
                <TextareaField placeholder="Description" onChange={this.handleChange.bind(this)} currentText={this.props.company_description} fieldName="company_description" />
                <div className="form-group">
                    <button className="btn registration-submit-button">
                        Create Client Company
                    </button>
                </div>
            </form>
        );
    }
}

ClientCompanyCreationForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        company_name: state.company_name,
        company_email: state.company_email,
        company_address: state.company_address,
        company_city: state.company_city,
        company_state: state.company_state,
        company_postal_code: state.company_postal_code,
        company_description: state.company_description,
        company_creation_success: state.company_creation_success,
        company_creation_errors: state.company_creation_errors
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateField: (field_name, field_value) => dispatch(updateCompanyForm(field_name, field_value)),
        submitCompanyCreation: (form_fields_info) => dispatch(createClientCompany(form_fields_info, getSessionToken()))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientCompanyCreationForm);
