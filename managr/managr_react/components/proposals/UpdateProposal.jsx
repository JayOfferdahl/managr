import React from 'react';

import { connect } from 'react-redux';
import { loadProposalFromServer } from '../../actions/ProposalActions';

import ForbiddenErrorMessage from './../errors/ForbiddenErrorMessage';
import ProposalForm from './ProposalForm';
import ProposalLoadFailureMessage from './ProposalLoadFailureMessage';
import ProposalTools from './ProposalTools';

class UpdateProposal extends React.Component {
    componentWillMount() {
        let session_token = localStorage.getItem("managr_session_token");
        this.props.loadProposalFromServer(this.props.params.proposal_uuid, session_token);
    };

    componentWillReceiveProps(next_props) {
        if(next_props.params.proposal_uuid != this.props.params.proposal_uuid) {
            let session_token = localStorage.getItem("managr_session_token");
            this.props.loadProposalFromServer(next_props.params.proposal_uuid, session_token);
        }
    }

    handleCancelUpdate() {
        this.context.router.push("/proposal/" + this.props.params.proposal_uuid);
    }

    render () {
        if(this.props.proposal_owner == "false") {
            return <ForbiddenErrorMessage />
        } else if(this.props.proposal_load_failure) {
            return <ProposalLoadFailureMessage />;
        } else {
            return (
                <div className="default-content">
                    <ProposalTools
                        owner={this.props.proposal_owner}
                        handleClick={this.handleCancelUpdate.bind(this)}
                        handleClickName="Cancel"
                        proposal_uuid={this.props.params.proposal_uuid}
                        text="Update the information and click 'Update Project Proposal' to change your proposal."
                        status="info"
                    />
                    <h2>Update Project Proposal: <b>{this.props.proposal.title}</b></h2><br/>
                    <ProposalForm 
                        update={true}
                        proposal_data={this.props.proposal}
                        submitMessage="Update Project Proposal"
                        proposal_uuid={this.props.params.proposal_uuid}
                    />
                </div>
            );
        }
    }
};

UpdateProposal.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        proposal: state.proposal_load_success,
        proposal_load_failure: state.proposal_load_failure,
        proposal_owner: state.proposal_owner,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadProposalFromServer: (proposal_uuid, session_token) => dispatch(loadProposalFromServer(proposal_uuid, session_token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProposal);
