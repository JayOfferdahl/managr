import React from 'react';
import { connect } from 'react-redux';

import ErrorsList from '../app_components/ErrorsList';
import SelectGroup from '../app_components/SelectGroup';
import Textfield from '../app_components/Textfield';
import TextareaField from '../app_components/TextareaField';

import { updateCompanyCreationForm, createClientCompany } from '../../actions/CompanyCreationActions';

import { states_array } from '../../assets/js/StatesArray';

// import { updateRegistrationForm, registerWithServer, loginAfterRegistration, resetRegistrationForm } from '../../actions/RegistrationActions';

class ClientCompanyCreationForm extends React.Component {
    componentDidUpdate(prevProps, prevState) {
        if (this.props.creation_success == true && prevProps.creation_success == false) {
            // Push to summary for now, probably want to redirect to some sort of company view in the future
            this.context.router.push('/summary');
        }
    }

    handleChange(fieldUpdate) {
        this.props.updateField(fieldUpdate.target.name, fieldUpdate.target.value);
    }

    handleSubmit(submitEvent) {
        submitEvent.preventDefault();
        this.props.submitCompanyCreation(this.props, localStorage.getItem('managr_session_token'));
    }

    render() {
        return (
            <form className="client-company-creation-form" onSubmit={this.handleSubmit.bind(this)}>
                <ErrorsList errors={this.props.creation_errors} />
                <Textfield type="text" placeholder="Company Name" onChange={this.handleChange.bind(this)} currentText={this.props.company_name} fieldName="company_name" />
                <Textfield type="text" placeholder="Company Email" onChange={this.handleChange.bind(this)} currentText={this.props.company_email} fieldName="company_email" />
                <Textfield type="text" placeholder="Address" onChange={this.handleChange.bind(this)} currentText={this.props.address} fieldName="address" />
                <Textfield type="text" placeholder="City" onChange={this.handleChange.bind(this)} currentText={this.props.city} fieldName="city" />
                <SelectGroup defaultOption="State" options={states_array} onChange={this.handleChange.bind(this)} fieldName="state" />
                <Textfield type="text" placeholder="Postal Code" onChange={this.handleChange.bind(this)} currentText={this.props.postal_code} fieldName="postal_code" />
                <TextareaField placeholder="Description" onChange={this.handleChange.bind(this)} currentText={this.props.description} fieldName="description" />
                <div className="form-group">
                    <button className="btn company-creation-submit-button">
                        Create
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
        address: state.address,
        city: state.city,
        state: state.state,
        postal_code: state.postal_code,
        description: state.description,
        creation_success: state.creation_success,
        creation_errors: state.creation_errors
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateField: (field_name, field_value) => dispatch(updateCompanyCreationForm(field_name, field_value)),
        submitCompanyCreation: (form_fields_info, session_token) => dispatch(createClientCompany(form_fields_info, session_token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientCompanyCreationForm);
