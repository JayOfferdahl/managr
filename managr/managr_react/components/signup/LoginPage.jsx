import React from 'react';
import { connect } from 'react-redux';

import LoginForm from './LoginForm'
import Overview from '../project/Overview'

import { authenticateWithManagrServer, setAuthenticatedState } from '../../actions/AuthenticationActions';

class LoginPage extends React.Component {
	componentWillMount() {
		if (this.props.location == null) {
			// Component rendered as redirect
			this.context.router.push('/login');
		}

		const session_token = localStorage.getItem('managr_session_token');
		if (session_token != null) {
			this.props.authenticateWithServer(session_token);
		} else {
			this.props.setUnauthenticated(false);
		}
	}

	render() {
		if (this.props.is_authenticated == true) {
			return (
				<Overview />
			);
		} else if (this.props.is_authenticated == false) {
			return (
				<div className="login-container">
					<LoginForm />
				</div>
			);
		} else if (this.props.is_authenticated == 'undetermined') {
			return (
				<div className="awaiting-authentication-container"></div>
			);
		}
	}
}

LoginPage.contextTypes = {
  	router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
    	is_authenticated: state.is_authenticated
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    	authenticateWithServer: (managr_session_token) => dispatch(authenticateWithManagrServer(managr_session_token)),
    	setUnauthenticated: (authState) => dispatch(setAuthenticatedState(authState))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
