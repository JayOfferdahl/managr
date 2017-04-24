import React from 'react';

import moment from 'moment';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import '../../assets/css/react-bootstrap-table.css';

import ActivityTable from './ActivityTable'

import '../../assets/css/App.css';

const MOCK_HEADERS = ['Result','Message','Timestamp']

const MOCK_DATA_ROWS = [{ 'Event': 'John Smith logged 8.5 hours onto the project.',
                        },
                        { 'Event': 'DitchWitch Driller used for 4.5 hours',
                        },
                        { 'Event': 'JLG 1500SJ Telescopic Boom Lift #1 used for 5 hours',
                        },
                        { 'Event': 'JLG 1500SJ Telescopic Boom Lift #3 9 hours',
                        },
                        { 'Event': 'JLG 660SJC Telescopic Crawler Boom Lift down for maintenance',
                        },
                        { 'Event': 'Johnny on the Spot cleaning',
                        },
                        { 'Event': 'Snow day',
                        },
                        { 'Event': 'Sublevel pouring complete',
                        },
                        { 'Event': 'CAT TL943D Telehandler #2 returned from maintenance',
                        },
                        { 'Event': 'OSHA suprise visit',
                        },
                        { 'Event': 'Incident: Jay Offerdahl suckerpunched Chad Papineau for no reason',
                        },
                        { 'Event': 'Struck oil while excavating sublevel for west compound',
                        },
                        { 'Event': 'Incident: generator #3 overloaded',
                        },
                        { 'Event': 'Brick purchase receipt added to files.',
                        }]

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
function dateDiff(a, b){
  return parseFloat(a['Timestamp'] - b['Timestamp']);
}
function _addDate(row) {
  row['Timestamp'] = randomDate(new Date(2017, 1, 1), new Date(2017,5,5));
  return row;
}

class Activity extends React.Component {
    render () {
      MOCK_DATA_ROWS.map(_addDate)
      MOCK_DATA_ROWS.push({'Event': 'The Undertaker threw Mankind off Hell In A Cell, and plummeted 16 ft through an announcer’s table',
                              'Timestamp': new Date(1998, 5, 28) });//'Sun June 28 1998 20:43:33 GMT-0500 (CDT)'});
      MOCK_DATA_ROWS.sort(dateDiff)
      return (
      <BootstrapTable data={MOCK_DATA_ROWS} striped hover pagination>
           <TableHeaderColumn isKey={true} dataSort={true} dataField='Timestamp'>Timestamp</TableHeaderColumn>
           <TableHeaderColumn dataSort={true} dataField='Event'>Event</TableHeaderColumn>
      </BootstrapTable>
    )
    }
}

export default Activity;
