import React, { Component } from 'react'
import { Nav, NavItem, Row, Col, Button, Grid } from 'react-bootstrap';
import './App.css'

export default class ProjectOverview extends Component {
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

        <Row className="nested-project-nav">
          <Nav bsStyle="tabs" justified>
            <NavItem eventKey={1} href="/home">Overview</NavItem>
            <NavItem eventKey={2} title="Item">Equipment</NavItem>
            <NavItem eventKey={3}>Labor</NavItem>
            <NavItem eventKey={4}>Materials</NavItem>
            <NavItem eventKey={5}>Activity</NavItem>
          </Nav>
        </Row>

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
      </Row>
    )
  }
}
