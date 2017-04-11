import React from 'react';

import '../../assets/css/App.css';
import { connect } from 'react-redux';
import { loadProposalFromServer } from '../../actions/ProposalActions';

class Proposal extends React.Component {
  componentWillMount() {
    this.props.loadProposalFromServer();
  };
  /*constructor(props) {
    super(props);
    this.options = {
      defaultSortName: 'name',  // default sort column name
      defaultSortOrder: 'desc',  // default sort order
    };
  };*/
  render () {
      return (
        <h1>proposal placeholder</h1>
      );
    }
};

const mapStateToProps = (state) => {
    return {
        proposal: state.proposal,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadProposalFromServer: () => dispatch(loadProposalFromServer())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Proposal);
