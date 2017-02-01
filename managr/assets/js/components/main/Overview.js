import React, { Component } from 'react'
import { Nav, NavItem, Row, Col, Button, Grid } from 'react-bootstrap';
import '../App.css'
import NestedNavBar from '../overview/NestedNavBar'

export default class Overview extends Component {
  render () {
    return (
      <Row className="project-content-section">
        <Row className="project-overview-section">
          <p className="project-title">Westminister School Renovation</p>
          <Col className="" xs={6} md={6}>
            <p>Overall Project Progress: <b>63%</b></p>
            <p>Active Milestones: <b>Lay Foundation, Drywall</b></p>
          </Col>
          <Col className="" xs={6} md={6}>
            <p>Client POC: <b>Debbie Walles</b> (913) 787 6969</p>
            <p>Company: <b>Johnson & Johnson Construction</b> (913) 679 4533</p>
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
