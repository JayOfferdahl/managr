import React from 'react';

import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { loadUserProjectMetadata } from '../../actions/AppActions';
import { getSessionToken } from '../../assets/js/app.jsx';

import '../../assets/css/App.css';

class NavProjectLinks extends React.Component {
    componentWillMount() {
        this.props.loadUserProjectMetadata();
    }

    generateProjectTuples(project_metadata) {
        let tuples = [];

        _.forEach(project_metadata, (value, key) => {
            let project = {}
            project['title'] = key;
            project['link'] = value;

            tuples.push(project);
        })

        return tuples;
    }

    render() {
        return (
            <div>
                <div className="nav-main-category" data-toggle="collapse" data-target="#projects">
                    <p>Projects</p><span className="glyphicon glyphicon-chevron-down"></span>
                </div>
                <div id="projects" className="nav-secondary-category collapse in">
                {
                    _.map(this.generateProjectTuples(this.props.project_metadata),
                        (project, index) => {
                        return (
                            <LinkContainer key={index} className="nav-secondary-link" to={"/project/" + project.link}>
                                <a className="nav-secondary-link">
                                    {project.title}
                                </a>
                            </LinkContainer>
                        );
                    })
                }
                    <LinkContainer className="nav-secondary-link" to="/create-project">
                        <a className="nav-secondary-link">
                            <span className="glyphicon glyphicon-plus"></span>
                            New Project
                        </a>
                    </LinkContainer>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        project_metadata: state.project_metadata,
        project_metadata_load_errors: state.project_metadata_load_errors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserProjectMetadata: () => dispatch(loadUserProjectMetadata(getSessionToken())),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavProjectLinks);
