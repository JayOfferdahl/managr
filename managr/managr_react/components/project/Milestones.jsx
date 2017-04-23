import React from 'react';

import '../../assets/dhtmlx/dhtmlxgantt.css'
import '../../assets/dhtmlx/dhtmlxgantt.js'
import '../../assets/css/milestones.css';

class Milestones extends React.Component {
    componentDidMount() {
        gantt.config.xml_date = "%Y-%m-%d %H:%i";
        gantt.init("gantt_chart");
        gantt.load("http://managr.dev.biz:8000/milestones/get");
        // TODO: hit this link: "http://managr.dev.biz:8000/milestones/get/:project_uuid" to send the project uuid.

        let dp = new gantt.dataProcessor("http://managr.dev.biz:8000/milestones/data-processor");
        dp.init(gantt);
        dp.setTransactionMode("POST", false);
    }

    render () {
        return (
            <div className="gantter" id="gantt_chart" />
        );
    };
}

export default Milestones;