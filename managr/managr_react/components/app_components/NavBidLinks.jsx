import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

import { loadUserBidMetadata } from '../../actions/AppActions';

class NavBidLinks extends React.Component {
    componentWillMount() {
        var token = localStorage.getItem("managr_session_token");
        this.props.loadUserBidMetadata(token);
    }

    componentWillReceiveProps(next_props) {
        // If we detect a bid deletion, update the navbar.
        if(next_props.bid_deleted != this.props.bid_deleted && next_props.bid_deleted == true) {
            let session_token = localStorage.getItem("managr_session_token");
            this.props.loadUserBidMetadata(session_token);
        }
    }

    generateBidTuples(bid_metadata) {
        let tuples = [];

        _.forEach(bid_metadata, (value, key) => {
            let bid = {}
            bid['title'] = key;
            bid['link'] = value;

            tuples.push(bid);
        })

        return tuples;
    }

    render() {
        return (
            <div>
                <div className="nav-main-category" data-toggle="collapse" data-target="#bids">
                    <p>Bids</p><span className="glyphicon glyphicon-chevron-down"></span>
                </div>
                <div id="bids" className="nav-secondary-category collapse in">
                {
                    _.map(this.generateBidTuples(this.props.bid_metadata),
                        (bid, index) => {
                        return (
                            <LinkContainer key={index} className="nav-secondary-link" to={"/proposal/" + bid.link}>
                                <a className="nav-secondary-link">
                                    {bid.title}
                                </a>
                            </LinkContainer>
                        );
                    })
                }
                    <LinkContainer className="nav-secondary-link" to="/show-proposals">
                        <a className="nav-secondary-link">
                            <span className="glyphicon glyphicon-search"></span>
                            Search Proposals
                        </a>
                    </LinkContainer>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        bid_deleted: state.bid_deleted,
        bid_metadata: state.bid_metadata,
        bid_metadata_load_errors: state.bid_metadata_load_errors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserBidMetadata: (session_token) => dispatch(loadUserBidMetadata(session_token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBidLinks);
