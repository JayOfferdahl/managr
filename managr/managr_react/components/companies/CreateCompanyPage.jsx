import React from 'react';

import ContractorCompanyCreationForm from './ContractorCompanyCreationForm'
import ClientCompanyCreationForm from './ClientCompanyCreationForm'
import JoinCompanyForm from './JoinCompanyForm'

import logo from '../../assets/img/logo.png';

class CreateCompanyPage extends React.Component {
    render() {
        let form;
        switch(this.props.params.company_type) {
            case '0':
                form = <ContractorCompanyCreationForm />;
                break;
            case '1':
                form = <JoinCompanyForm />;
                break;
            case '2':
                form = <ClientCompanyCreationForm />;
                break;
            default:
                form = <div>404 Error</div>;
        }
        return (
            <div className="registration-container-parent">
                <div className="registration-container">
                    <div className="registration-logo">
                        <img src={logo} className="registration-logo" alt="logo" />
                    </div>
                    {form}
                </div>
            </div>
        );
    }
}

CreateCompanyPage.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default CreateCompanyPage;
