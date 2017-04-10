import React from 'react';
import { connect } from 'react-redux';

import ManagrError from './ManagrError'

import _ from 'lodash';

import '../../assets/css/App.css';

class ErrorsList extends React.Component {
	buildUniqueKeys(errors_list) {
		let new_errors_list = [];

		_.forEach(errors_list, (values, key) => {
			for (let value of values) {
				new_errors_list.push(value);
			}
		})

		return new_errors_list;
	}

	render () {
		if(!Object.keys(this.props.errors).length) {
			return false;
		}
		else {
			return (
				<div className="bg-danger errors-list">
				{
					_.map(this.buildUniqueKeys(this.props.errors), (value) => {
						return (
							<ManagrError errorText={value} />
						);
					})
				}
				</div>
			);
		}
	}
}

const mapStateToProps = (state, ownProps) => {
    return {
        errors: ownProps.errors
    };
};

export default connect(mapStateToProps)(ErrorsList);
