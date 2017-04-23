import React from 'react';

import { LinkContainer } from 'react-router-bootstrap';

import NavBidLinks from './NavBidLinks';
import NavProjectLinks from './NavProjectLinks';
import NavProposalLinks from './NavProposalLinks';

import '../../assets/css/App.css';

class NavBar extends React.Component {
    render() {
        return (
            <div className="nav-links-container">
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
            </div>
        );
    }
}

export default NavBar;
