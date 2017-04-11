import React from 'react';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import '../../assets/css/App.css';

class NavBar extends React.Component {
    render() {
        return (
            <Nav className="nav-links-container">
                <LinkContainer to="/overview">
                    <NavItem className="nav-text" eventKey={1}>
                        <span className="glyphicon glyphicon-home"></span>
                        Project Overview
                    </NavItem>
                </LinkContainer>
                <LinkContainer to="/milestones">
                    <NavItem className="nav-text" eventKey={2}>
                        <span className="glyphicon glyphicon-tasks"></span>
                        Milestones
                    </NavItem>
                </LinkContainer>
                <LinkContainer to="/finance">
                    <NavItem className="nav-text" eventKey={3}>
                        <span className="glyphicon glyphicon-usd"></span>
                        Finance
                    </NavItem>
                </LinkContainer>
                <LinkContainer to="/documents">
                    <NavItem className="nav-text" eventKey={4}>
                        <span className="glyphicon glyphicon-file"></span>
                        Documents
                    </NavItem>
                </LinkContainer>
                <LinkContainer to="/create-bid">
                    <NavItem className="nav-text" eventKey={5}>
                        <span className="glyphicon glyphicon-edit"></span>
                        Create New Bid
                    </NavItem>
                </LinkContainer>
                <LinkContainer to="/past-projects">
                    <NavItem className="nav-text" eventKey={6}>
                        <span className="glyphicon glyphicon-folder-close"></span>
                        Past Projects
                    </NavItem>
                </LinkContainer>
                <LinkContainer to="/create-proposal">
                    <NavItem className="nav-text bottom" eventKey={7}>
                        <span className="glyphicon glyphicon-plus"></span>
                        New Proposal
                    </NavItem>
                </LinkContainer>
            </Nav>
        );
    }
}

export default NavBar;
