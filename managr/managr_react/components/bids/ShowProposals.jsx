import React from 'react';

import '../../assets/css/App.css';
import { connect } from 'react-redux';
import { loadProposalsFromServer } from '../../actions/ShowProposalsActions';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


class ShowProposals extends React.Component {
  componentWillMount() {
    this.props.loadProposalsFromServer();
  };
  render () {
      return (
            <BootstrapTable data= { this.props.proposals } striped hover>
                <TableHeaderColumn isKey dataField='name'>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='location'>Location</TableHeaderColumn>
                <TableHeaderColumn dataField='budget'>Budget</TableHeaderColumn>
                <TableHeaderColumn dataField='start'>Start Date</TableHeaderColumn>
                <TableHeaderColumn dataField='end'>End Date</TableHeaderColumn>
            </BootstrapTable>
        );
    }
};
const mapStateToProps = (state) => {
    return {
        proposals: state.proposals,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadProposalsFromServer: () => dispatch(loadProposalsFromServer())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowProposals);
