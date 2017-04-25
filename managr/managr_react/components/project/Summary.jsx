import React from 'react';

import { Row, Col, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import SimpleLineChart from '../graphs/SimpleLineChart'
import SimplePieChart from '../graphs/SimplePieChart'
import ItemOverview from './ItemOverview'

import '../../assets/css/App.css';

class Summary extends React.Component {
    render () {
        return (
            <div>
                <Row>
                    <Col md={4}>
                        <ItemOverview active="0" total="0" type="Milestones" />
                    </Col>
                    <Col md={4}>
                        <ItemOverview active="0" total="0" type="Workers" />
                    </Col>
                    <Col md={4}>
                        <ItemOverview active="0" total="0" type="Equipment" />
                    </Col>
                </Row>
                <Row className="graph-section">
                    <h3>Weekly Summary Graph</h3>
                    <SimpleLineChart />
                </Row>
            </div>
        );
    }
}

export default Summary;
