import React from 'react';

import '../../assets/css/App.css';
import { connect } from 'react-redux';
import { loadProposalsFromServer } from '../../actions/ShowProposalsActions';
import JsonTable from 'react-json-table'


class ShowProposals extends React.Component {
  componentWillMount() {
    // The mock milestones in the server have project uuid 10.
    this.props.loadProposalsFromServer();
}

    render () {
      //if(Object.keys(this.props.proposals).length != 0) {
        return (
           <JsonTable rows = {this.props.proposals} />
        );
      //} else {
    //    return (
      //    <h1>no proposals</h1>
        //);
    //  }
    }
};
const mapStateToProps = (state) => {
    return {
        proposals: state.proposals,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadProposalsFromServer: (project_uuid) => dispatch(loadProposalsFromServer())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowProposals);
//export default ShowProposals;
