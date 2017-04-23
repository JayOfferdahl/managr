import React from 'react';

import { connect } from 'react-redux';

import BidTools from '../bids/BidTools';
import ProposalTools from './ProposalTools';

class ProposalToolBar extends React.Component {
    render () {
        if(this.props.proposal_owner) {
            return <ProposalTools proposal_uuid={this.props.proposal_uuid} update={this.props.update} />;
        }
        else
            return <BidTools proposal_uuid={this.props.proposal_uuid} />;
    }
};

const mapStateToProps = (state) => {
    return {
        proposal_owner: state.proposal_owner,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProposalToolBar);
