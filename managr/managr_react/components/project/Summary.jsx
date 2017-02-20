import React from 'react';
import { Row, Col, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import SimpleLineChart from '../graphs/SimpleLineChart'

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
                      <SimpleLineChart />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Summary;
