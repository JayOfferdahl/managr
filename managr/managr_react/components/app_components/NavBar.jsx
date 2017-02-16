import React from 'react';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import '../../assets/css/App.css';

import milestoneIcon from "../../assets/img/milestone-icon.png";
import financeIcon from "../../assets/img/finance-icon.png";
import docsIcon from "../../assets/img/docs-icon.png";
import projectIcon from "../../assets/img/project-icon.png";

class NavBar extends React.Component {
    render() {
        return (
            <Nav className="nav-links-container">
                <LinkContainer to="/overview">
                    <NavItem eventKey={1}>
                        <img src={projectIcon} className="nav-icon" alt="project" />
                        Project Overview
                    </NavItem>
                </LinkContainer>
                <LinkContainer to="/milestones">
                    <NavItem eventKey={2}>
                        <img src={milestoneIcon} className="nav-icon" alt="milestoens" />
                        Milestones
                    </NavItem>
                </LinkContainer>
                <LinkContainer to="/finance">
                    <NavItem eventKey={3}>
                        <img src={financeIcon} className="nav-icon" alt="finance" />
                        Finance
                    </NavItem>
                </LinkContainer>
                <LinkContainer to="/documents">
                    <NavItem eventKey={4}>
                        <img src={docsIcon} className="nav-icon" alt="documents" />
                        Documents
                    </NavItem>
                </LinkContainer>
            </Nav>
        );
    }
}

/*
<NavDropdown eventKey={5} title="Authorization" id="basic-nav-dropdown">
    <LinkContainer to="/logout">
        <MenuItem eventKey={5.1}>Logout</MenuItem>
    </LinkContainer>
</NavDropdown>
*/

export default NavBar;
