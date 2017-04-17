import React from 'react';

class ForbiddenErrorMessage extends React.Component {
    goBack() {
        this.context.router.goBack();
    }

    render () {
        return (
            <div className="default-content">
                <h2>Error 403: <b>Page Forbidden.</b></h2>
                <br/>
                <p>
                    You are not allowed to view this page.&nbsp;
                    <a onClick={this.goBack.bind(this)}>Go back to where you were.</a>
                </p>
            </div>
        );
    }
};

ForbiddenErrorMessage.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default ForbiddenErrorMessage;
