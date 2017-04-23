import React from 'react';

import moment from 'moment';

import ActivityTable from './ActivityTable'

import '../../assets/css/App.css';

const MOCK_HEADERS = ['Result','Message','Timestamp']

const MOCK_DATA_ROWS = [{ 'Message': 'John Smith logged 8.5 hours onto the project.',
                          'Timestamp': moment().format('MMMM Do YYYY, h:mm:ss a'),
                        },
                        { 'Message': 'DitchWitch Driller used for 4.5 hours',
                          'Timestamp': moment().format('MMMM Do YYYY, h:mm:ss a'),
                        },
                        { 'Message': 'Brick purchase receipt added to files.',
                          'Timestamp': moment().format('MMMM Do YYYY, h:mm:ss a'),
                        }]

class Activity extends React.Component {
    render () {
        return <ActivityTable headers={MOCK_HEADERS} rows={MOCK_DATA_ROWS} />
    }
}

export default Activity;
