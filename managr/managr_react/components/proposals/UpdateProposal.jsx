import React from 'react';

import { connect } from 'react-redux';
import { loadProposalFromServer, beginUpdateProposal } from '../../actions/ProposalActions';
import { getSessionToken } from '../../assets/js/app.jsx';

import ForbiddenErrorMessage from './../errors/ForbiddenErrorMessage';
import ProposalLoadFailureMessage from './ProposalLoadFailureMessage';
import ProposalForm from './ProposalForm';
import ProposalToolBar from './ProposalToolBar';

class UpdateProposal extends React.Component {
    componentWillMount() {
        this.props.loadProposalFromServer(this.props.params.proposal_uuid);
        this.props.beginUpdateProposal();
    };

    componentWillReceiveProps(next_props) {
        if(next_props.params.proposal_uuid != this.props.params.proposal_uuid) {
            this.props.loadProposalFromServer(next_props.params.proposal_uuid);
        }
    }

    render () {
        if(this.props.proposal_load_failure) {
            return <ProposalLoadFailureMessage />;
        } else if(!this.props.proposal_owner) {
            return <ForbiddenErrorMessage />
        } else {
            return (
                <div className="default-content">
                    <ProposalToolBar proposal_uuid={this.props.params.proposal_uuid} update={true} />
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
        loadProposalFromServer: (proposal_uuid) => dispatch(loadProposalFromServer(proposal_uuid, getSessionToken())),
        beginUpdateProposal: () => dispatch(beginUpdateProposal()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProposal);
