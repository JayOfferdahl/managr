import React from 'react';
import { connect } from 'react-redux';

import LoginPage from '../signup/LoginPage'

import { authenticateWithManagrServer } from '../../actions/AuthenticationActions';
import { getSessionToken } from '../../assets/js/app';

class EnsureAuthenticated extends React.Component {
    componentWillMount() {
        if (getSessionToken() == null) {
            this.context.router.push('/');
        } else {
            this.props.authenticateWithServer();
        }
    }

    render() {
        if (this.props.is_authenticated == true) {
            return (
                <div className="authenticated-container App">
                    {this.props.children}
                </div>
            );
        } else if (this.props.is_authenticated == false) {
            return (
                <LoginPage />
            );
        } else if (this.props.is_authenticated == 'undetermined') {
            return (
                <div className="awaiting-authentication-container"></div>
            );
        }
    }
}

EnsureAuthenticated.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        is_authenticated: state.is_authenticated
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        authenticateWithServer: () => dispatch(authenticateWithManagrServer(getSessionToken()))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EnsureAuthenticated);
