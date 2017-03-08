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
            <div className="app-container">
                <Col className="app-nav-main">
                    <NavBar/>
                </Col>
                <Col className="app-content-main">
                    <div className="flex-header">
                        <Header />
                    </div>    
                    <div className="flex-content">
                        {this.props.children}
                    </div>
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
