import React from 'react';
import { Col } from 'react-bootstrap';

import Header from './Header'
import NavBar from './NavBar'

class NavAndHeader extends React.Component {
	render () {
		return (
			<div className="nav-and-header-container">
				<Col className="navbar" sm={2}>
					<NavBar />
				</Col>
				<Col sm={10}>
					<Header />
					{this.props.children}
				</Col>
			</div>
		);
	}
}

export default NavAndHeader;
