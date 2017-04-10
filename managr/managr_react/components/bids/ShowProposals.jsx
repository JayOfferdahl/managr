import React from 'react';

import '../../assets/css/App.css';
import { connect } from 'react-redux';
import { loadProposalsFromServer } from '../../actions/ShowProposalsActions';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const options = {
  onRowClick: function(row) {
    //alert(`You click row id: ${row.name}`);
    var getURL = window.location;
    window.location.href = getURL.protocol + "//" + getURL.host + "/proposal/" + row.name;
  }
};

class ShowProposals extends React.Component {
  componentWillMount() {
    this.props.loadProposalsFromServer();
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
        <BootstrapTable data = { this.props.proposals } options = { options } striped hover pagination>
            <TableHeaderColumn isKey = { true } dataSort={ true } filter={ { type: 'TextFilter'} } dataField='name'>Name</TableHeaderColumn>
            <TableHeaderColumn dataSort={ true } filter={ { type: 'TextFilter'} } dataField='location'>Location</TableHeaderColumn>
            <TableHeaderColumn dataSort={ true } dataField='budget'>Budget</TableHeaderColumn>
            <TableHeaderColumn dataSort={ true } dataField='start'>Start Date</TableHeaderColumn>
            <TableHeaderColumn dataSort={ true } dataField='end'>End Date</TableHeaderColumn>
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
