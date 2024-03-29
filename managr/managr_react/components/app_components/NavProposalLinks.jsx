import React from 'react';

import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { loadUserProposalMetadata } from '../../actions/AppActions';
import { getSessionToken } from '../../assets/js/app.jsx';

class NavProposalLinks extends React.Component {
    componentWillMount() {
        this.props.loadUserProposalMetadata();
    }

    componentWillReceiveProps(next_props) {
        // If we detect a proposal deletion, update the navbar.
        if(next_props.proposal_deleted != this.props.proposal_deleted && next_props.proposal_deleted == true) {
            this.props.loadUserProposalMetadata();
        }
    }

    generateProposalTuples(proposal_metadata) {
        let tuples = [];

        _.forEach(proposal_metadata, (metadata, key) => {
            let proposal = {}
            proposal['title'] = key;
            proposal['link'] = metadata.proposal_uuid;
            proposal['flagged'] = metadata.flagged;

            tuples.push(proposal);
        })

        return tuples;
    }

    render() {
        return (
            <div>
                <div className="nav-main-category" data-toggle="collapse" data-target="#proposals">
                        <p>Proposals</p><span className="glyphicon glyphicon-chevron-down"></span>
                </div>
                <div id="proposals" className="nav-secondary-category collapse in">
                {
                    _.map(this.generateProposalTuples(this.props.proposal_metadata),
                        (proposal, index) => {
                        let notification;
                        if(proposal.flagged)
                            notification = <span className="glyphicon glyphicon-exclamation-sign nav-status-icon icon-success" />
                        return (
                            <LinkContainer key={index} className="nav-secondary-link" to={"/proposal/" + proposal.link}>
                                <a>
                                    {proposal.title}
                                    {notification}
                                </a>
                            </LinkContainer>
                        );
                    })
                }
                    <LinkContainer className="nav-secondary-link" to="/create-proposal">
                        <a>
                            <span className="glyphicon glyphicon-plus"></span>
                            New Proposal
                        </a>
                    </LinkContainer>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        proposal_deleted: state.proposal_deleted,
        proposal_metadata: state.proposal_metadata,
        proposal_metadata_load_errors: state.proposal_metadata_load_errors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserProposalMetadata: () => dispatch(loadUserProposalMetadata(getSessionToken())),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavProposalLinks);
