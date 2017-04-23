import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

import '../../assets/css/App.css';
import NavBidLinks from './NavBidLinks';
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
                <NavBidLinks />

                {/* Past projects section */}
                <div className="nav-main-category" data-toggle="collapse" data-target="#past-projects">
                    <p>Past Projects</p><span className="glyphicon glyphicon-chevron-down"></span>
                </div>
                <div id="past-projects" className="nav-secondary-category collapse in">
                    <LinkContainer className="nav-secondary-link" to="/past-projects">
                        <a className="nav-secondary-link">
                            <span className="glyphicon glyphicon-folder-close"></span>
                            Past Projects
                        </a>
                    </LinkContainer>
                </div>
            </Nav>
        );
    }
}

export default NavBar;
