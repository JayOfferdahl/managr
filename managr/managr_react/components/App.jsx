import React from 'react';
import { connect } from 'react-redux';

import { djangoDataFetch } from '../actions/AppActions'

class App extends React.Component {
	componentDidMount() {
		this.props.fetchData('http://managr.dev.biz:8000/home/');
	}

	render() {
		return (
			<h1>{this.props.django_string}</h1>
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
