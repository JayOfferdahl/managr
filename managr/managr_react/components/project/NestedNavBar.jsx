import React from 'react';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import '../../assets/css/App.css';

class NestedNavBar extends React.Component {
    render() {
        return (
            <Nav bsStyle="tabs" activeKey={1} justified>
                <LinkContainer to="/summary">
                    <NavItem style={{color: 'black'}} eventKey={5}>Summary</NavItem>
                </LinkContainer>
                <LinkContainer to="/equipment">
                    <NavItem style={{color: 'black'}} eventKey={6}>Equipment</NavItem>
                </LinkContainer>
                <LinkContainer to="/labor">
                    <NavItem style={{color: 'black'}} eventKey={7}>Labor</NavItem>
                </LinkContainer>
                <LinkContainer to="/materials">
                    <NavItem style={{color: 'black'}} eventKey={8}>Materials</NavItem>
                </LinkContainer>
                <LinkContainer to="/activity">
                    <NavItem style={{color: 'black'}} eventKey={9}>Activity</NavItem>
                </LinkContainer>
            </Nav>
        )
    }
}

export default NestedNavBar;
