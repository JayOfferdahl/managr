import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

import { loadUserProposalMetadata } from '../../actions/AppActions';
import '../../assets/css/App.css';

class NavProposalLinks extends React.Component {
    componentWillMount() {
        var token = localStorage.getItem("managr_session_token");
        this.props.loadUserProposalMetadata(token);
    }

    componentWillReceiveProps(next_props) {
        // If we detect a proposal deletion, update the navbar.
        if(next_props.proposal_deleted != this.props.proposal_deleted && next_props.proposal_deleted == true) {
            let session_token = localStorage.getItem("managr_session_token");
            this.props.loadUserProposalMetadata(session_token);
        }
    }

    generateProposalTuples(proposal_metadata) {
        let tuples = [];

        _.forEach(proposal_metadata, (value, key) => {
            let proposal = {}
            proposal['title'] = key;
            proposal['link'] = value;

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
                        (proposal) => {
                        return (
                            <LinkContainer className="nav-secondary-link" to={"/proposal/" + proposal.link}>
                                <a className="nav-secondary-link">
                                    {proposal.title}
                                </a>
                            </LinkContainer>
                        );
                    })
                }
                    <LinkContainer className="nav-secondary-link" to="/create-proposal">
                        <a className="nav-secondary-link">
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
        loadUserProposalMetadata: (session_token) => dispatch(loadUserProposalMetadata(session_token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavProposalLinks);
