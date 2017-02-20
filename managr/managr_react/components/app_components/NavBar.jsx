import React from 'react';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import '../../assets/css/App.css';

import milestoneIcon from "../../assets/img/top_charts.png";
import financeIcon from "../../assets/img/ledger.png";
import docsIcon from "../../assets/img/file_graph.png";
import overviewIcon from "../../assets/img/world_times.png";
import createNewIcon from "../../assets/img/new.png";
import pastProjectsIcon from "../../assets/img/past.png";

class NavBar extends React.Component {
    render() {
        return (
            <Nav className="nav-links-container">
                <LinkContainer to="/overview">
                    <NavItem className="nav-text" eventKey={1}>
                        <img src={overviewIcon} className="nav-icon" alt="project" />
                        Project Overview
                    </NavItem>
                </LinkContainer>
                <LinkContainer to="/milestones">
                    <NavItem className="nav-text" eventKey={2}>
                        <img src={milestoneIcon} className="nav-icon" alt="milestones" />
                        Milestones
                    </NavItem>
                </LinkContainer>
                <LinkContainer to="/finance">
                    <NavItem className="nav-text" eventKey={3}>
                        <img src={financeIcon} className="nav-icon" alt="finance" />
                        Finance
                    </NavItem>
                </LinkContainer>
                <LinkContainer to="/documents">
                    <NavItem className="nav-text" eventKey={4}>
                        <img src={docsIcon} className="nav-icon" alt="documents" />
                        Documents
                    </NavItem>
                </LinkContainer>
                <LinkContainer to="/createnewbid">
                    <NavItem className="nav-text" eventKey={5}>
                        <img src={createNewIcon} className="nav-icon" alt="createnew" />
                        Create New Bid
                    </NavItem>
                </LinkContainer>
                <LinkContainer to="/pastprojects">
                    <NavItem className="nav-text" eventKey={6}>
                        <img src={pastProjectsIcon} className="nav-icon" alt="pastprojects" />
                        Past Projects
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
