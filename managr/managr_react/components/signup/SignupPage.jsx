import React from 'react';

import { connect } from 'react-redux';

import RegistrationForm from './RegistrationForm'
import { authenticateWithManagrServer, setAuthenticatedState } from '../../actions/AuthenticationActions';
import { getSessionToken } from '../../assets/js/app.jsx';

import '../../assets/css/signup.css';
import logo from '../../assets/img/logo.png';

class SignupPage extends React.Component {
    componentWillMount() {
        if (getSessionToken() != null) {
            this.props.authenticateWithServer();
        } else {
            this.props.setUnauthenticated('undetermined');
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.is_authenticated == true)
            this.context.router.push('/dashboard');
    }

    render() {
        return (
            <div className="registration-container-parent">
                <div className="registration-container">
                    <div className="registration-logo">
                        <img src={logo} className="registration-logo" alt="logo" />
                    </div>
                    <RegistrationForm />
                </div>
            </div>
        );
    }
}

SignupPage.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        is_authenticated: state.is_authenticated
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        authenticateWithServer: () => dispatch(authenticateWithManagrServer(getSessionToken())),
        setUnauthenticated: (authState) => dispatch(setAuthenticatedState(authState))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
