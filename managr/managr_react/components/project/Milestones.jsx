import React from 'react';
import { Row, Col} from 'react-bootstrap';

import '../../assets/dhtmlx/dhtmlxgantt.css'
import '../../assets/dhtmlx/dhtmlxgantt.js'
import '../../assets/css/milestones.css';

class Milestones extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        var tasks =  {
            data:[
                {id:1, text:"Project #2", start_date:"01-04-2013", duration:18,order:10,
                    progress:0.4, open: true},
                {id:2, text:"Task #1",    start_date:"02-04-2013", duration:8, order:10,
                    progress:0.6, parent:1},
                {id:3, text:"Task #2",    start_date:"11-04-2013", duration:8, order:20,
                    progress:0.6, parent:1}
            ],
                    links:[
            { id:1, source:1, target:2, type:"1"},
            { id:2, source:2, target:3, type:"0"},
            { id:3, source:3, target:4, type:"0"},
            { id:4, source:2, target:5, type:"2"},
        ]
        };

        gantt.init("gantt_chart");
        gantt.parse(tasks);
    }

    render () {
        const fullScreen = {
        };

        return (
            <Row className="is-flex">
                <div className="gantter" id="gantt_chart" style={fullScreen} />
                <p>*Until I can figure out how to get this to fit the viewport, it's got a static height of 800px.</p>
            </Row>
        );
    };
}

export default Milestones;
