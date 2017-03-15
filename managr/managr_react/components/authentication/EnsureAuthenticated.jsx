import React from 'react';
import { connect } from 'react-redux';

import LoginPage from '../signup/LoginPage'

import { authenticateWithManagrServer } from '../../actions/AuthenticationActions';

class EnsureAuthenticated extends React.Component {
	componentWillMount() {
		const session_token = localStorage.getItem('managr_session_token');
		if (session_token == null) {
			this.context.router.push('/login');
		} else {
			this.props.authenticateWithServer(session_token);
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
    	authenticateWithServer: (managr_session_token) => dispatch(authenticateWithManagrServer(managr_session_token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EnsureAuthenticated);
