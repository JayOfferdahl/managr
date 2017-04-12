import React from 'react';
import { connect } from 'react-redux';

class ManagrError extends React.Component {
	render () {
		return (
			<div className="alert-danger">
				&bull; {this.props.error_text}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
    return {
        error_text: ownProps.errorText
    };
};

export default connect(mapStateToProps)(ManagrError);
