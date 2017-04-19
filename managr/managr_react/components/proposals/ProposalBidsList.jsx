import React from 'react';

import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { loadBidsFromServer } from '../../actions/ProposalActions';
import { getSessionToken } from '../../assets/js/app.jsx';

import '../../assets/css/react-bootstrap-table.css';

class ProposalBidsList extends React.Component {
    componentWillMount() {
        this.props.loadBidsFromServer(this.props.proposal_uuid);
    };

    numericSortFunc(a, b, order) {
        if (order === 'desc') {
            return Number(b.budget) - Number(a.budget);
        } else {
            return Number(a.budget) - Number(b.budget);
        }
    };

    render () {
        return (
                <div>
                    <hr/>
                    <h3>Bids on your project</h3>
                    <br/>
                    <BootstrapTable data={this.props.bids} striped hover pagination>
                        <TableHeaderColumn isKey={true} dataSort={true} dataField='budget'>Budget</TableHeaderColumn>
                        <TableHeaderColumn dataSort={true} dataField='start_date'>Start Date</TableHeaderColumn>
                        <TableHeaderColumn dataSort={true} dataField='end_date'>End Date</TableHeaderColumn>
                        <TableHeaderColumn dataSort={true} dataField='contact_number'>Contact</TableHeaderColumn>
                        <TableHeaderColumn dataSort={true} dataField='description'>Description</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            );
    }
};

const options = {
    onRowClick: function(row) {
        console.log(row.uuid);
    }
};

const mapStateToProps = (state) => {
    return {
        bids: state.bids_on_proposal,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadBidsFromServer: (proposal_uuid) => dispatch(loadBidsFromServer(proposal_uuid, getSessionToken())),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProposalBidsList);
