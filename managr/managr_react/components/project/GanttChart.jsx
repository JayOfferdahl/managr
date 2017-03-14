import React from 'react';

import '../../assets/dhtmlx/dhtmlxgantt.css'
import '../../assets/dhtmlx/dhtmlxgantt.js'
import '../../assets/css/milestones.css';

class GanttChart extends React.Component {
    componentDidMount() {
        gantt.init("gantt_chart");
        gantt.parse(this.props.data);
    }

    render () {
        return (
            <div className="gantter" id="gantt_chart" />
        );
    };
}
export default GanttChart;
