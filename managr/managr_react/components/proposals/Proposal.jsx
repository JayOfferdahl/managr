import React from 'react';

class Proposal extends React.Component {
    render () {
        return (
            <div>
                <h2>This is the new project page.</h2>
                <p>We need to complete the following tasks here:</p>
                <ul>
                    <li>Add form which accepts relevant project input.</li>
                    <li>Connect the form from the front end to the server (which will create the proposal object.</li>
                    <li>Style the page.</li>
                </ul>
            </div>
        )
    };
}

export default Proposal;