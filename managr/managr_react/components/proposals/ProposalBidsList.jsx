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

    handleAcceptBid(bid_uuid) {
        console.log("Handling the acception of bid uuid: " + bid_uuid);
    }

    handleDeclineBid(bid_uuid) {
        console.log("Handling the declination of bid uuid: " + bid_uuid);
    }

    bidTableButtons(cell, row) {
        return (
            <div className="react-bs-table-buttons">
                <button onClick={this.handleAcceptBid.bind(this, row.bid_uuid)} className="btn btn-success">
                    <span className="glyphicon glyphicon-ok" />
                </button>
                <button onClick={this.handleDeclineBid.bind(this, row.bid_uuid)} className="btn btn-danger">
                    <span className="glyphicon glyphicon-remove" />
                </button>
            </div>
        );
    }

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
                        <TableHeaderColumn dataField='contact_number'>Contact</TableHeaderColumn>
                        <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
                        <TableHeaderColumn dataField="buttons" width="123" dataFormat={this.bidTableButtons.bind(this)}>Accept/Decline</TableHeaderColumn>
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
