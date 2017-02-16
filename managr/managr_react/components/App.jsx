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
				{this.props.django_string}
				<div className="App-body">
					<Grid fluid={true}>
						<Col className="left navbar" xs={4} md={2}>
							<NavBar/>
							<div className="nav-buttons-container">
								<LinkContainer to="/pastprojects">
				                	<Button className="nav-button" bsSize="large" bsStyle="warning">View Past Projects</Button>
				                </LinkContainer>
				                <LinkContainer to="/createnewbid">
				                	<Button className="nav-button" bsSize="large" bsStyle="success">Create New Bid</Button>
				                </LinkContainer>
							</div>
						</Col>
						<Col className="right" xs={14} md={10}>
							<Header />
                			{this.props.children}
						</Col>
					</Grid>
				</div>
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
