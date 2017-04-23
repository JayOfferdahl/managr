import React from 'react';

import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { logoutOfServer, resetLogoutState } from '../../actions/LoginActions';
import { getSessionToken } from '../../assets/js/app.jsx';

class LogoutButton extends React.Component {
    componentDidUpdate(prevProps, prevState) {
        if (this.props.logout_success == true && prevProps.logout_success == false) {
            this.context.router.push('/');
            this.props.handleResetLogout();
            localStorage.removeItem('managr_session_token');
        }
    }

    handleLogout() {
        this.props.logout();
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
        logout: () => dispatch(logoutOfServer(getSessionToken())),
        handleResetLogout: () => dispatch(resetLogoutState())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
