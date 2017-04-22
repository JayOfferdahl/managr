import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

import '../../assets/css/App.css';
import NavProposalLinks from './NavProposalLinks';
import NavProjectLinks from './NavProjectLinks';

class NavBar extends React.Component {
    render() {
        return (
            <Nav className="nav-links-container">
                {/* Projects section */}
                <NavProjectLinks />

                {/* Proposals section */}
                <NavProposalLinks />

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
