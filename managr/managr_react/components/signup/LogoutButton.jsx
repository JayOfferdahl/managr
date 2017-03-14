import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { logoutOfServer, resetLogoutState } from '../../actions/LoginActions';

class LogoutButton extends React.Component {
	componentDidUpdate(prevProps, prevState) {
		if (this.props.logout_success == true && prevProps.logout_success == false) {
			this.context.router.push('/login');
			this.props.handleResetLogout();
			localStorage.removeItem('managr_session_token');
		}
	}

	handleLogout() {
		const session_token = localStorage.getItem('managr_session_token');
		this.props.logout(session_token);
	}

	render() {
		return (
			<div className="logout-container">
				<Button onClick={this.handleLogout.bind(this)} bsSize="small" bsStyle='primary'>Logout</Button>
			</div>
		);
	}
}

LogoutButton.contextTypes = {
  	router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	return {
		logout_success: state.logout_success
	};
};

const mapDispatchToProps = (dispatch) => {
    return {
    	logout: (managr_session_token) => dispatch(logoutOfServer(managr_session_token)),
    	handleResetLogout: () => dispatch(resetLogoutState())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
