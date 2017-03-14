import React from 'react';
import { Nav, NavItem, Row, Col, Button, Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import '../assets/css/App.css';

class App extends React.Component {
	render() {
		return (
			<div className="App">
				{this.props.children}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
