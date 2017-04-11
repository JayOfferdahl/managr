import React from 'react';

class UpdateProposal extends React.Component {
    render () {
        return (
            <div>
                <h2>This is the update proposal page.</h2>
                <p>We need to complete the following tasks here:</p>
                <ul>
                    <li>Add an element which displays current proposals and their statuses.</li>
                    <li>Connect the form from the front end to the server (which will update the proposal object.</li>
                    <li>Style the page.</li>
                </ul>
            </div>
        )
    };
}

export default UpdateProposal;
