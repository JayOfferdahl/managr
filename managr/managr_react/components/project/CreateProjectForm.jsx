import React from 'react';

import { connect } from 'react-redux';
import { updateCreateProjectForm, createNewProject } from '../../actions/ProjectActions';
import { getSessionToken } from '../../assets/js/app.jsx';

import ErrorsList from '../app_components/ErrorsList';

class CreateProjectForm extends React.Component {
    componentDidUpdate(prevProps, prevState) {
        if (this.props.create_project_success == true && prevProps.create_project_success == false) {
            this.context.router.push("/project-overview/" + this.props.new_project_uuid);
        }
    }

    handleChange(fieldUpdate) {
        this.props.updateField(fieldUpdate.target.name, fieldUpdate.target.value);
    }

    handleSubmit(submitEvent) {
        submitEvent.preventDefault();
        this.props.submitNewProject(this.props);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)} className="proposal-form">
                <ErrorsList errors={this.props.create_project_errors} />
                <div className="proposal-form-section proposal-form-section-left">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="create_project_name" maxLength="255" required 
                                onChange={this.handleChange.bind(this)} value={this.props.create_project_name} />
                    </div>
                </div>

                <div className="proposal-form-section proposal-form-section-right">
                    <div className="form-group">
                        <label htmlFor="budget">Budget</label>
                        <div className="input-group">
                            <div className="input-group-addon">$</div>
                            <input type="number" name="create_project_budget" className="form-control" max="9999999999" min="0" required 
                                onChange={this.handleChange.bind(this)} value={this.props.create_project_budget} />
                            <div className="input-group-addon">.00</div>
                        </div>
                    </div>
                </div>

                <div className="form-group" className="proposal-form-description">
                    <label htmlFor="create_project_description">Description</label>
                    <textarea name="create_project_description" placeholder="Write your project description here" required
                        onChange={this.handleChange.bind(this)} value={this.props.create_project_description}></textarea>
                </div>

                <button className="btn btn-warning project-form-submit">
                    Create Project
                </button>
            </form>
        );
    }
}

CreateProjectForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        create_project_name: state.create_project_name,
        create_project_description: state.create_project_description,
        create_project_budget: state.create_project_budget,
        create_project_errors: state.create_project_errors,
        create_project_success: state.create_project_success,
        new_project_uuid: state.new_project_uuid,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateField: (field_name, field_value) => dispatch(updateCreateProjectForm(field_name, field_value)),
        submitNewProject: (project_data) => dispatch(createNewProject(project_data, getSessionToken())),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectForm);
