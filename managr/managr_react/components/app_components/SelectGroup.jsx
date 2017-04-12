import React from 'react';
import { connect } from 'react-redux';

import SelectOption from './SelectOption';

import _ from 'lodash';

import '../../assets/css/App.css';

class SelectGroup extends React.Component {
	render() {
		return (
			<div className="form-group">
				<select name={this.props.fieldName} onChange={this.props.onChange}>
                <option disabled selected hidden>{this.props.defaultOption}</option>
                {
                    _.map(this.props.options, (option, index) => {
                        return (
                            <SelectOption value={index} displayText={option} />
                        );
                    })
                }
				</select>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
    return {
        defaultOption: ownProps.defaultOption,
        options: ownProps.options,
        fieldName: ownProps.fieldName,
        onChange: ownProps.onChange,
    };
};

export default connect(mapStateToProps)(SelectGroup);
