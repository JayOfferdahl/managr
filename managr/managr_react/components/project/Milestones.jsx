import React from 'react';

import { connect } from 'react-redux';
import { resetMilestones, flagMilestones } from '../../actions/MilestonesActions';

import '../../assets/dhtmlx/dhtmlxgantt.css'
import '../../assets/dhtmlx/dhtmlxgantt.js'
import '../../assets/css/milestones.css';

class Milestones extends React.Component {
    componentDidMount() {
        if(this.props.reload_milestones) {
            this.props.resetMilestones();
            window.location.reload();
        } else {
            this.props.flagMilestones();
        }
        this.ganttInit(this.props.params.project_uuid);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.params.project_uuid != nextProps.params.project_uuid) {
            window.location.reload();
        }
    }

    ganttInit(project_uuid) {
        gantt.config.xml_date = "%Y-%m-%d %H:%i";
        gantt.init("gantt_chart");
        gantt.load("http://managr.dev.biz:8000/milestones/get/" + project_uuid);
        
        let dp = new gantt.dataProcessor("http://managr.dev.biz:8000/milestones/data-processor/" + this.props.params.project_uuid);
        dp.init(gantt);
        dp.setTransactionMode("POST", false);
    }

    render () {
        return (
            <div className="gantter" id="gantt_chart" />
        );
    };
}

const mapStateToProps = (state) => {
    return {
        reload_milestones: state.reload_milestones,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        resetMilestones: () => dispatch(resetMilestones()),
        flagMilestones: () => dispatch(flagMilestones()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Milestones);
