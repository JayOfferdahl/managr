import React from 'react';
import { Row, Col, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import '../../assets/css/App.css';

class Summary extends React.Component {
    render () {
        return (
            <div>
                <Row className="project-3col-section">
                    <Col md={4}>
                        <div className="content-block">
                            <h1>Content Block</h1>
                            <p>This will be a content block displaying a list of Active milestones.</p>
                        </div>
                    </Col>

                    <Col md={4}>
                        <div className="content-block">
                            <h1>Content Block</h1>
                            <p>This will be a content block displaying a list of Active Workers and their time logs.</p>
                        </div>
                    </Col>

                    <Col md={4}>
                        <div className="content-block">
                            <h1>Content Block</h1>
                            <p>This will be a content block displaying a list of Active Equipment and  their time logs.</p>
                        </div>
                    </Col>
                </Row>
                <Row className="project-1col-section">
                    <Col md={12}>
                        <div className="content-block">
                            <h1>Wide Content Block</h1>
                            <p>This will show a weekly summary graph and total logged hours. and other stuff.</p>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Summary;
