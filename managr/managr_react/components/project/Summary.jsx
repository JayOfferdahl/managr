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
                        <ItemOverview active="4" total="17" type="Milestones" />
                    </Col>
                    <Col md={4}>
                        <ItemOverview active="24" total="119" type="Workers" />
                    </Col>
                    <Col md={4}>
                        <ItemOverview active="19" total="88" type="Equipment" />
                    </Col>
                </Row>
                <Row className="graph-section">
                    <h3>Weekly Summary Graph</h3>
                    <SimpleLineChart />
                    <SimplePieChart />
                </Row>
            </div>
        );
    }
}

export default Summary;
