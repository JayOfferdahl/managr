import React from 'react';
import { connect } from 'react-redux';

import ContractorCompanyCreationForm from './ContractorCompanyCreationForm'

class CreateCompanyPage extends React.Component {
    render() {
        switch(this.props.params.company_type) {
            case '0':
                return (<ContractorCompanyCreationForm />);
            case '1':
                return (<div>Join existing contractor flow</div>);
            case '2':
                return (<div>Client company creation form</div>);
            default:
                return (<div>404 Error</div>);
        }
    }
}

CreateCompanyPage.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCompanyPage);
