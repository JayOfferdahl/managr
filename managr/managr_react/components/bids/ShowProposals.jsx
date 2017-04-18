import React from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Router, browserHistory } from 'react-router';

import '../../assets/css/App.css';
import { loadProposalsFromServer } from '../../actions/ShowProposalsActions';

function numericSortFunc(a, b, order) {
    if (order === 'desc') {
        return Number(b.budget) - Number(a.budget);
    } else {
        return Number(a.budget) - Number(b.budget);
    }
};

class ShowProposals extends React.Component {
    componentWillMount() {
        var token = localStorage.getItem("managr_session_token");
        this.props.loadProposalsFromServer(token);
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
    //this.context.router.push('/proposals/:' + row.uuid);
    //console.log(row.uuid);
    //fetch('http://managr.dev.biz:8000/proposals/proposal', {method : 'post', body : row.uuid});
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
        loadProposalsFromServer: (token) => dispatch(loadProposalsFromServer(token)),
        // loadProposalFromServer: (proposalID) => dispatch(loadProposalFromServer(proposalID))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowProposals);
