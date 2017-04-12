import React from 'react';

import '../../assets/css/App.css';
import { connect } from 'react-redux';
import { loadProposalFromServer } from '../../actions/ProposalActions';

class Proposal extends React.Component {
  componentWillMount() {
    this.props.loadProposalFromServer(this.props.uuid);
  };
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  };
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

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
        loadProposalFromServer: (proposalID) => dispatch(loadProposalFromServer(proposalID))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Proposal);
