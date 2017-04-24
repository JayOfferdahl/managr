import React from 'react';

import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { fetchProjectInfoFromServer } from '../../actions/ProjectActions';
import { getSessionToken } from '../../assets/js/app.jsx';

import OverviewContent from './OverviewContent';

import '../../assets/css/App.css';

class ProjectOverview extends React.Component {
    componentWillMount() {
        this.props.fetchProjectInformation(this.props.params.project_uuid);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.params.project_uuid != nextProps.params.project_uuid) {
            this.props.fetchProjectInformation(nextProps.params.project_uuid);
        }
    }

    render () {
        let clientInformation = <Col xs={6} md={6} />;

        if(this.props.project.client_exists) {
            clientInformation = (
                <Col xs={6} md={6}>
                    <p><b>Client:</b> {this.props.project.client_name}</p>
                    <p><b>Point of Contact:</b> {this.props.project.client_contact}</p>
                </Col>
            );
        }

        return (
            <Row className="default-content">
                <Row className="project-header">
                    <h2>Project: <b>{this.props.project.name}</b></h2>
                    <br/>
                    <Col xs={6} md={6}>
                        <p><b>Contractor:</b> {this.props.project.contractor_name}</p>
                        <p><b>Point of Contact:</b> {this.props.project.contractor_contact}</p>
                    </Col>
                    {clientInformation}
                </Row>
                <Row>
                    <Col>
                        <p><b>Description:</b> {this.props.project.description}</p>
                    </Col>
                </Row>
                <br/>
                <OverviewContent project_uuid={this.props.params.project_uuid} />
            </Row>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        project: state.project_data,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProjectInformation: (project_uuid) => dispatch(fetchProjectInfoFromServer(project_uuid, getSessionToken())),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectOverview);

