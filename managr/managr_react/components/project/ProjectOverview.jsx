import React from 'react';

import { connect } from 'react-redux';
import { Nav, NavItem, Row, Col, Button, Grid } from 'react-bootstrap';
import { fetchProjectInfoFromServer } from '../../actions/ProjectActions';
import { getSessionToken } from '../../assets/js/app.jsx';

import NestedNavBar from './NestedNavBar';

import '../../assets/css/App.css';

class ProjectOverview extends React.Component {
    componentWillMount() {
        this.props.fetchProjectInformation(this.props.params.project_uuid);
    }

    render () {
        return (
            <Row className="project-content-section">
                <Row className="project-overview-section">
                    <p className="project-name">{this.props.project_overview_name}</p>
                    <p className="project-description">Description: {this.props.project_overview_description}</p>
                    <p className="project-budget">Budget: {this.props.project_overview_budget}</p>
                    <Col className="" xs={6} md={6}>
                        <p>Overall Project Progress: <b>TODO</b></p>
                    </Col>
                    <Col className="" xs={6} md={6}>
                        <p>Client: <b>CLIENT NAME HERE?</b></p>
                        <p>Company: <b>CONTRACTOR COMPANY NAME HERE</b></p>
                    </Col>
                </Row>
                <NestedNavBar />
                <Row>
                    {this.props.children}
                </Row>
            </Row>
        )
    }
}

ProjectOverview.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        overview_project_name: state.overview_project_name,
        project_overview_name: state.project_overview_name,
        project_overview_description: state.project_overview_description,
        project_overview_budget: state.project_overview_budget,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProjectInformation: (project_uuid) => dispatch(fetchProjectInfoFromServer(project_uuid, getSessionToken())),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectOverview);

