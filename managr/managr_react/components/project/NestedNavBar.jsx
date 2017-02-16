import React from 'react';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import '../../assets/css/App.css';

class NestedNavBar extends React.Component {
  render() {
    return (
      <Nav bsStyle="tabs" justified>
        <LinkContainer to="/summary">
          <NavItem eventKey={5}>Summary</NavItem>
        </LinkContainer>
        <LinkContainer to="/equipment">
          <NavItem eventKey={6}>Equipment</NavItem>
        </LinkContainer>
        <LinkContainer to="/labor">
          <NavItem eventKey={7}>Labor</NavItem>
        </LinkContainer>
        <LinkContainer to="/materials">
          <NavItem eventKey={8}>Materials</NavItem>
        </LinkContainer>
        <LinkContainer to="/activity">
          <NavItem eventKey={9}>Acitivty</NavItem>
        </LinkContainer>
      </Nav>
    )
  }
}

export default NestedNavBar;
