import React from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import { loadProposalsFromServer } from '../../actions/ShowProposalsActions';

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

    /*constructor(props) {
        super(props);
        this.options = {
            defaultSortName: 'name',  // default sort column name
            defaultSortOrder: 'desc',  // default sort order
        };
    };*/

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

ShowProposals.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const options = {
    onRowClick: function(row) {
        //this.context.router.push('/proposals/:' + row.uuid);
        //console.log(row.uuid);
        fetch('http://managr.dev.biz:8000/proposals/proposal', {method : 'post', body : row.uuid});
    }
};

const mapStateToProps = (state) => {
    return {
        proposals: state.proposals,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadProposalsFromServer: () => dispatch(loadProposalsFromServer()),
        // loadProposalFromServer: (proposalID) => dispatch(loadProposalFromServer(proposalID))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowProposals);
