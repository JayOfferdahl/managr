import React from 'react';

import { LinkContainer } from 'react-router-bootstrap';

class ProposalLoadFailureMessage extends React.Component {
    render () {
        return (
            <div className="default-content">
                <h2>Error 404: <b>Project proposal not found</b></h2>
                <br/>
                <p>
                    The proposal you're looking for no longer exists or never existed.&nbsp;
                    <LinkContainer to="/show-proposals">
                        <a>Try searching proposals here.</a>
                    </LinkContainer>
                </p>
            </div>
        );
    }
};

export default ProposalLoadFailureMessage;
