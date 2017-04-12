import React from 'react';
import { connect } from 'react-redux';

class SelectOption extends React.Component {
    render() {
        return (
            <option value={this.props.value}>{this.props.displayText}</option>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        value: ownProps.value,
        displayText: ownProps.displayText
    };
};

export default connect(mapStateToProps)(SelectOption);
