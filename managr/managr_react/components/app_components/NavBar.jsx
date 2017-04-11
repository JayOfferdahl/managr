import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import '../../assets/css/App.css';

class NavBar extends React.Component {
    render() {
        return (
            <Nav className="nav-links-container">
                {/* Projects section */}
                <div className="nav-main-category" data-toggle="collapse" data-target="#projects">
                    <p>Projects</p><span className="glyphicon glyphicon-chevron-down"></span>
                </div>
                <div id="projects" className="nav-secondary-category collapse in">
                    <LinkContainer className="nav-secondary-link" to="/summary">
                        <a className="nav-secondary-link">
                            <span className="glyphicon glyphicon-home"></span>
                            Project Overview
                        </a>
                    </LinkContainer>
                    <LinkContainer className="nav-secondary-link" to="/milestones">
                        <a className="nav-secondary-link">
                            <span className="glyphicon glyphicon-tasks"></span>
                            Milestones
                        </a>
                    </LinkContainer>
                    <LinkContainer to="/finance">
                        <a className="nav-secondary-link">
                            <span className="glyphicon glyphicon-usd"></span>
                            Finance
                        </a>
                    </LinkContainer>
                    <LinkContainer className="nav-secondary-link" to="/documents">
                        <a className="nav-secondary-link">
                            <span className="glyphicon glyphicon-file"></span>
                            Documents
                        </a>
                    </LinkContainer>
                    <LinkContainer className="nav-secondary-link" to="/project-settings">
                        <a className="nav-secondary-link">
                            <span className="glyphicon glyphicon-cog"></span>
                            Settings
                        </a>
                    </LinkContainer>
                </div>

                {/* Proposals section */}
                <div className="nav-main-category" data-toggle="collapse" data-target="#proposals">
                    <p>Proposals</p><span className="glyphicon glyphicon-chevron-down"></span>
                </div>
                <div id="proposals" className="collapse nav-secondary-category">
                    <LinkContainer className="nav-secondary-link" to="/create-proposal">
                        <a className="nav-secondary-link">
                            <span className="glyphicon glyphicon-plus"></span>
                            New Proposal
                        </a>
                    </LinkContainer>
                </div>

                {/* Bids section */}
                <div className="nav-main-category" data-toggle="collapse" data-target="#bids">
                    <p>Bids</p><span className="glyphicon glyphicon-chevron-down"></span>
                </div>
                <div id="bids" className="collapse nav-secondary-category">
                    <LinkContainer className="nav-secondary-link" to="/create-bid">
                        <a className="nav-secondary-link">
                            <span className="glyphicon glyphicon-plus"></span>
                            Create New Bid
                        </a>
                    </LinkContainer>
                </div>

                {/* Past projects section */}
                <div className="nav-main-category" data-toggle="collapse" data-target="#past-projects">
                    <p>Past Projects</p><span className="glyphicon glyphicon-chevron-down"></span>
                </div>
                <div id="past-projects" className="collapse nav-secondary-category">
                    <LinkContainer className="nav-secondary-link" to="/past-projects">
                        <a className="nav-secondary-link">
                            <span className="glyphicon glyphicon-folder-close"></span>
                            Past Projects
                        </a>
                    </LinkContainer>
                </div>
                <br/>
                <p>Note: Projects/past projects need to have a list of projects associated with the user, and they should link to that project page which shows relevant information about the project.</p>
            </Nav>
        );
    }
}

export default NavBar;
