import React from 'react';
import { Nav, NavItem, Row, Col, Button, Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Helmet } from 'react-helmet';

import '../assets/css/App.css';
import favicon from '../assets/img/favicon/favicon.ico';


class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Helmet>
                    <link rel="shortcut icon" type="image/icon" href={favicon} />
                </Helmet>
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
