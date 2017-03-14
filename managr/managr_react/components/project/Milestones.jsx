import React from 'react';

import { connect } from 'react-redux';
import { loadMilestonesFromServer } from '../../actions/MilestonesActions';
import GanttChart from './GanttChart';

import '../../assets/css/milestones.css';

class Milestones extends React.Component {
    componentWillMount() {
        // The mock milestones in the server have project uuid 10.
        this.props.loadMilestonesFromServer(10);
    }

    render () {
        if(Object.keys(this.props.milestones).length != 0) {
            return (
                <GanttChart data={this.props.milestones} />
            );
        }
        else {
            return (
                <div>Loading...</div>
            );
        }
    };
}
const mapStateToProps = (state) => {
    return {
        milestones: state.milestones,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadMilestonesFromServer: (project_uuid) => dispatch(loadMilestonesFromServer(project_uuid))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Milestones);