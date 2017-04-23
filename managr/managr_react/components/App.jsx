import React from 'react';

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

export default App;
