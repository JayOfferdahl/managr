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
                <div className="avatar-section">
                  <img src={avatar} className="avatar-icon" alt="avatar" />
                    <div className="avatar-text">
                      <p><b>John Smith</b></p>
                      <p> Project Lead 2</p>
                    </div>
                    <hr/>
                </div>
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
              </Col>
              <Col xs={14} md={10}>
              <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
              </div>
                <Row className="project-overview-section">
                  <p className="project-title">Westminister School Renovation</p>
                  <p>Project Progress: <b>63%</b></p>
                  <p>Active Milestones: <b>Lay Foundation, Drywall</b></p>
                  <p>Client POC: <b>Debbie Walles</b> (913) 787 6969</p>
                </Row>
                <p>Here is the content</p>
              </Col>
            </Row>
          </Grid>
          </div>
        </div>
    );
  }
}

export default App;
