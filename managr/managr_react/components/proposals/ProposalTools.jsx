import React from 'react';

import { connect } from 'react-redux';
import { deleteProposal, resetProposalView } from '../../actions/ProposalActions';

class ProposalTools extends React.Component {
    componentDidUpdate(prevProps, prevState) {
        if (this.props.proposal_deleted == true && prevProps.proposal_deleted == false) {
            // this.props.handleReset();
            // this.context.router.push('/summary');
            // What should we do here?
        }
    }

    componentWillReceiveProps(next_props) {
        // If we're changing proposal, force update
        if(next_props.proposal_uuid != this.props.proposal_uuid) {
            this.props.resetProposalView();
        }
    }

    handleDelete(submitEvent) {
        if(!this.props.proposal_deleted && confirm("Are you sure you want to delete this proposal?")) {
            let session_token = localStorage.getItem("managr_session_token");
            this.props.deleteProposal(this.props.proposal_uuid, session_token);
        }
    }

    render () {
        if(this.props.owner == "true") {
            let deleteSuccess, toolBarClass;
            if(this.props.proposal_deleted) {
                deleteSuccess = <p>This proposal has been deleted.</p>;
                toolBarClass = "alert alert-warning proposal-success";
            } else {
                deleteSuccess = <p>This proposal is live on the Managr contractor network.</p>;
                toolBarClass = "alert alert-success proposal-success";
            }

            return (
                <div className={toolBarClass}>
                    <div className="proposal-tool-buttons">
                        <button
                            className="btn btn-sm btn-default"
                            onClick={this.props.handleClick}
                            disabled={this.props.proposal_deleted}
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={this.handleDelete.bind(this)}
                            disabled={this.props.proposal_deleted}
                        >
                            Delete
                        </button>
                    </div>
                    {deleteSuccess}
                </div>
            );
        } else {
            return (
                <div className="alert alert-info proposal-success">
                    <div className="proposal-tool-buttons">
                        <button className="btn btn-sm btn-primary" onClick={this.props.handleClick}>
                            Bid
                        </button>
                    </div>
                    <p>This project proposal is active. To create a bid on it, click 'Bid'.</p>
                </div>
            );
        }
    }
};

ProposalTools.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        proposal_deleted: state.proposal_deleted,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteProposal: (proposal_uuid, session_token) => dispatch(deleteProposal(proposal_uuid, session_token)),
        resetProposalView: () => dispatch(resetProposalView()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProposalTools);
