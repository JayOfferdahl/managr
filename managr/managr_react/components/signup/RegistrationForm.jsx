import React from 'react';
import { connect } from 'react-redux';

class RegistrationForm extends React.Component {
	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value })
	}

	onSubmit(event) {
		event.preventDefault();
		console.log(this.state);
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit.bind(this)}>
				<h4>Username:</h4>
				<input type="text" name="username" value={this.props.username} onChange={this.handleChange.bind(this)} />
			</form>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		username: state.username,
		email: state.email,
		password: state.password,
		password_confirmation: state.password_confirmation
	};
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
