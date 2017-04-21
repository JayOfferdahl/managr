import React from 'react';

import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Router, browserHistory } from 'react-router';
import { loadProposalsFromServer } from '../../actions/BidActions';
import { getSessionToken } from '../../assets/js/app.jsx';

import '../../assets/css/App.css';

function numericSortFunc(a, b, order) {
    if (order === 'desc') {
        return Number(b.budget) - Number(a.budget);
    } else {
        return Number(a.budget) - Number(b.budget);
    }
};

class ShowProposals extends React.Component {
    componentWillMount() {
        this.props.loadProposalsFromServer();
    };

    handleSubmit(submitEvent) {
        submitEvent.preventDefault();
        this.props.loadProposalFromServer(this.props);
    }

    render () {
        return (
            <BootstrapTable data = { this.props.proposals } options = { options } striped hover pagination>
                <TableHeaderColumn isKey = { true } dataSort={ true } filter={ { type: 'TextFilter'} } dataField='name'>Name</TableHeaderColumn>
                <TableHeaderColumn dataSort={ true } filter={ { type: 'TextFilter'} } dataField='location'>Location</TableHeaderColumn>
                <TableHeaderColumn dataSort={ true } sortFunc={ numericSortFunc } dataField='budget'>Budget</TableHeaderColumn>
                <TableHeaderColumn dataSort={ true } dataField='start'>Start Date</TableHeaderColumn>
                <TableHeaderColumn dataSort={ true } dataField='end'>End Date</TableHeaderColumn>
            </BootstrapTable>
        );
    }
};

const options = {
  onRowClick: function(row) {
    browserHistory.push('/proposal/' + row.uuid);
  }
};

const mapStateToProps = (state) => {
    return {
        proposals: state.proposals,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadProposalsFromServer: () => dispatch(loadProposalsFromServer(getSessionToken())),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowProposals);
