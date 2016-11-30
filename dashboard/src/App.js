import React, { Component } from 'react';
import logo from '../img/logo.png';
import avatar from '../img/avatar.png';

/*
NAVIGATION ICONS
*/
import milestoneIcon from "../img/milestone-icon.png";
import financeIcon from "../img/finance-icon.png";
import docsIcon from "../img/docs-icon.png";
import projectIcon from "../img/project-icon.png";

import {
  FormControl,
  Row,
  Col,
  Button,
  Nav,
  NavItem,
  Grid
} from 'react-bootstrap';

//CSS Stuff
import './App.css';

class App extends Component {

    constructor(props) {
      super(props);

      this.state = {
        dataObj: null
      };
    }

    render() {
      return(

        <div className="App">
          <div className="App-body">
            <Grid fluid={true}>
              <Row>
                <Col className="navbar" xs={4} md={2}>
                  <Nav className="navigation" bsStyle="pills" stacked>
                    <NavItem eventKey={1}>
                      <img src={projectIcon} className="nav-icon" alt="project" />
                      Project
                    </NavItem>
                    <NavItem eventKey={2}>
                      <img src={milestoneIcon} className="nav-icon" alt="milestoens" />
                      Milestones
                    </NavItem>
                    <NavItem eventKey={3}>
                      <img src={financeIcon} className="nav-icon" alt="finance" />
                      Finance
                    </NavItem>
                    <NavItem eventKey={4}>
                      <img src={docsIcon} className="nav-icon" alt="documents" />
                      Documents
                    </NavItem>
                  </Nav>
                  <div className="buttons">
                    <Button className="my-button" bsSize="large" bsStyle="warning">View Past Projects</Button>
                    <Button className="my-button" bsSize="large" bsStyle="success">Create New Bid</Button>
                  </div>
                </Col>

                <Col xs={14} md={10}>
                  <Row className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <div className="avatar-section">
                      <div className="avatar-text">
                        <p><b>John Smith</b></p>
                      </div>
                      <img src={avatar} className="avatar-icon" alt="avatar" />
                    </div>
                  </Row>

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
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
    );
  }
}

export default App;
