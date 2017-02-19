import React from 'react';
import { Nav, NavItem, Row, Col, Button, Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import NavBar from './app_components/NavBar';
import Header from './app_components/Header';

import { djangoDataFetch } from '../actions/AppActions';

import '../assets/css/App.css';

class App extends React.Component {
	componentDidMount() {
		this.props.fetchData('http://managr.dev.biz:8000');
	}

	render() {
		return (
			<div className="App">
						<Col className="navbar" sm={3}>
							<NavBar/>
						</Col>
						<Col sm={9}>
							<Header />
              {this.props.children}
						</Col>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
    return {
        django_string: state.django_string
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (api_endpoint) => dispatch(djangoDataFetch(api_endpoint))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
