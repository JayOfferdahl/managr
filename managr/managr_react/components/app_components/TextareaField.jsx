import React from 'react';

import { connect } from 'react-redux';

class TextareaField extends React.Component {
    render() {
        return (
            <div className="form-group">
                <textarea value={this.props.current_text} placeholder={this.props.placeholder} name={this.props.field_name} onChange={this.props.onChange} />
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
    };
};

export default connect(mapStateToProps)(TextareaField);
