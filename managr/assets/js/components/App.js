import React, { Component } from 'react'
import { Link } from 'react-router'
import { Nav, NavItem, Row, Col, Button, Grid } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import NavBar from './NavBar'
import Header from './Header'

import './App.css';

import logo from '../../img/logo.png';
import avatar from '../../img/avatar.png';
import milestoneIcon from "../../img/milestone-icon.png";
import financeIcon from "../../img/finance-icon.png";
import docsIcon from "../../img/docs-icon.png";
import projectIcon from "../../img/project-icon.png";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-body">
          <Grid fluid={true}>
              <Col className="left navbar" xs={4} md={2}>
                <NavBar/>
                <div className="nav-buttons-container">
                  <LinkContainer to="/pastprojects">
                    <Button className="nav-button" bsSize="large" bsStyle="warning">View Past Projects</Button>
                  </LinkContainer>
                  <LinkContainer to="/createnewbid">
                    <Button className="nav-button" bsSize="large" bsStyle="success">Create New Bid</Button>
                  </LinkContainer>
                </div>
              </Col>
              <Col className="right" xs={14} md={10}>
                <Header />
                {this.props.children}
              </Col>
          </Grid>
        </div>
      </div>
    )
  } //end render
}
