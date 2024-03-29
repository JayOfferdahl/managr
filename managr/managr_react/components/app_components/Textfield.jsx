import React from 'react';

import { connect } from 'react-redux';

class Textfield extends React.Component {
    render() {
        return (
            <div className="form-group">
                <input type={this.props.type} value={this.props.current_text} placeholder={this.props.placeholder} name={this.props.field_name} onChange={this.props.onChange} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        placeholder: ownProps.placeholder,
        onChange: ownProps.onChange,
        current_text: ownProps.currentText,
        field_name: ownProps.fieldName,
        type: ownProps.type
    };
};

export default connect(mapStateToProps)(Textfield);
