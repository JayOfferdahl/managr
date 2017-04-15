import React from 'react';

class ProposalTools extends React.Component {
    render () {
        if(this.props.owner == "true") {
            return (
                <div className="alert alert-success proposal-success">
                    <div className="proposal-tool-buttons">
                        <button className="btn btn-sm btn-default">
                            Edit
                        </button>
                        <button className="btn btn-sm btn-danger">
                            Delete
                        </button>
                    </div>
                    <p>This proposal is live on the Managr contractor network.</p>
                </div>
            );
        } else {
            return (
                <div className="alert alert-info proposal-success">
                    <div className="proposal-tool-buttons">
                        <button className="btn btn-sm btn-primary">
                            Bid
                        </button>
                    </div>
                    <p>This project proposal is active. To create a bid on it, click 'Bid'.</p>
                </div>
            );
        }
    }
};

export default ProposalTools;
