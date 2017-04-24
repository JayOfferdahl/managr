import React from 'react';

import { Row } from 'react-bootstrap';

import CreateProjectForm from './CreateProjectForm'

import '../../assets/css/project.css';

class CreateProject extends React.Component {
    render () {
        return (
            <Row className="default-content">
                <h2>Create a new project</h2>
                <br/>
                <CreateProjectForm />
            </Row>
        )
    };
}

export default CreateProject;
