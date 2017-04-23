import React from 'react';

import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { browserHistory } from 'react-router';
import { loadUserProposalMetadata,
         loadUserProjectMetadata,
         loadUserBidMetadata } from '../../actions/AppActions';
import { getSessionToken } from '../../assets/js/app.jsx';

class Dashboard extends React.Component {
    componentWillMount() {
        this.props.loadUserProjectMetadata();
        this.props.loadUserProposalMetadata();
        this.props.loadUserBidMetadata();
    }

    generateProjectTuples(project_metadata) {
        let tuples = [];

        _.forEach(project_metadata, (value, key) => {
            let project = {}
            project['title'] = key;
            project['link'] = value;

            tuples.push(project);
        })

        return tuples;
    }

    generateBidProposalTuples(metadata) {
        let tuples = [];

        _.forEach(metadata, (dict, key) => {
            let data = {}
            data['title'] = key;
            data['link'] = dict.proposal_uuid;
            data['flagged'] = dict.flagged;

            tuples.push(data);
        })

        return tuples;
    }

    bidProposalFlagged(cell, row) {
        if(row.flagged) {
            return (
                <div className="text-center"><span className="glyphicon glyphicon-exclamation-sign icon-red" /></div>
            );
        } else {
            return (
                <span className="glyphicon icon-blank" />
            );
        }
    }

    getAlertStatus(fieldValue, row, rowIndex, colIndex) {
        return row.flagged ? "alert-danger" : "";
    }

    render () {
        return (
            <div className="default-content dashboard-content">
                <h2>Account Dashboard</h2>
                <div className="dashboard-section">
                    <h3>Active projects:</h3>
                    <BootstrapTable data={this.generateProjectTuples(this.props.project_metadata)} options={linkToProject} striped hover>
                        <TableHeaderColumn isKey={true} dataSort={true} dataField='title'>Title</TableHeaderColumn>
                    </BootstrapTable>
                </div>
                <div className="dashboard-section">
                    <h3>Active proposals:</h3>
                    <BootstrapTable data={this.generateBidProposalTuples(this.props.proposal_metadata)} options={linkToProposal} striped hover>
                        <TableHeaderColumn isKey={true} dataSort={true} dataField='title'>Title</TableHeaderColumn>
                        <TableHeaderColumn dataField="buttons" width="128" dataFormat={this.bidProposalFlagged} columnClassName={this.getAlertStatus}>Requires Action</TableHeaderColumn>
                    </BootstrapTable>
                </div>
                <div className="dashboard-section">
                    <h3>Active bids:</h3>
                    <BootstrapTable data={this.generateBidProposalTuples(this.props.bid_metadata)} options={linkToProposal} striped hover>
                        <TableHeaderColumn isKey={true} dataSort={true} dataField='title'>Title</TableHeaderColumn>
                        <TableHeaderColumn dataField="buttons" width="128" dataFormat={this.bidProposalFlagged} columnClassName={this.getAlertStatus}>Requires Action</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        );
    }
}

const linkToProposal = {
    onRowClick: function(row) {
        browserHistory.push('/proposal/' + row.link);
    }
};

const linkToProject = {
    onRowClick: function(row) {
        browserHistory.push('/project-overview/' + row.link);
    }
};

const mapStateToProps = (state) => {
    return {
        project_metadata: state.project_metadata,
        project_metadata_load_errors: state.project_metadata_load_errors,
        proposal_metadata: state.proposal_metadata,
        proposal_metadata_load_errors: state.proposal_metadata_load_errors,
        bid_metadata: state.bid_metadata,
        bid_metadata_load_errors: state.bid_metadata_load_errors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserProjectMetadata: () => dispatch(loadUserProjectMetadata(getSessionToken())),
        loadUserProposalMetadata: () => dispatch(loadUserProposalMetadata(getSessionToken())),
        loadUserBidMetadata: () => dispatch(loadUserBidMetadata(getSessionToken())),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
