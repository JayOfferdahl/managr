import React from 'react';

import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import EquipmentTable from './EquipmentTable'

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import '../../assets/css/react-bootstrap-table.css';

import '../../assets/css/App.css';

const MOCK_HEADERS = ['Result','Equipment Name','Hourly Rate','Total Usage','Total Expense']

const MOCK_DATA_ROWS = [{ 'name': 'JCT9000 Backhoe',
                          'usage': 45.3,
                          'rate': 120,
                        },
                        { 'name': 'DitchWitch Driller',
                          'usage': 22.1,
                          'rate': 54,
                        },
                        { 'name': 'JLG 1500SJ Telescopic Boom Lift #1',
                          'usage': 69,
                          'rate': 10,
                        },
                        { 'name': 'JLG 1500SJ Telescopic Boom Lift #2',
                          'usage': 42,
                          'rate': 10,
                        },
                        { 'name': 'JLG 1500SJ Telescopic Boom Lift #3',
                          'usage': 129,
                          'rate': 10,
                        },
                        { 'name': 'JLG 1500SJ Telescopic Boom Lift #4',
                          'usage': 13,
                          'rate': 10,
                        },
                        { 'name': 'JLG 1500SJ Telescopic Boom Lift #5',
                          'usage': 90,
                          'rate': 10,
                        },
                        { 'name': 'JLG 1500SJ Telescopic Boom Lift #6',
                          'usage': 53,
                          'rate': 10,
                        },
                        { 'name': 'JLG 1500SJ Telescopic Boom Lift #7',
                          'usage': 22,
                          'rate': 10,
                        },
                        { 'name': 'JLG 660SJC Telescopic Crawler Boom Lift',
                          'usage': 120,
                          'rate': 35.12,
                        },
                        { 'name': 'CAT TL943D Telehandler #1',
                          'usage': 28,
                          'rate': 54,
                        },
                        { 'name': 'CAT TL943D Telehandler #2',
                          'usage': 32,
                          'rate': 54,
                        },
                        { 'name': 'CAT TL943D Telehandler #3',
                          'usage': 25,
                          'rate': 54,
                        },
                        { 'name': '40TON 2012 MANITEX 40124S Crane',
                          'usage': 85,
                          'rate': 35,
                        },
                        { 'name': 'Johnny On the Spot',
                          'usage': 8008,
                          'rate': 10,
                        }]
function _addCost(row) {
  row['Total Cost'] = "$" + Math.round(row['usage'] * row['rate'] * 100)/100 ;
  row['rate'] = "$" + row['rate'];
  return row;
}
class Equipment extends React.Component {
    // render () {
    //     return <EquipmentTable headers={MOCK_HEADERS} rows={MOCK_DATA_ROWS}/>
    // }
    render (){
      MOCK_DATA_ROWS.map(_addCost)
        return (
             <BootstrapTable data={MOCK_DATA_ROWS} striped hover pagination>
                  <TableHeaderColumn isKey={true} dataSort={true} dataField='name'>Equipment Name</TableHeaderColumn>
                  <TableHeaderColumn dataSort={true} dataField='usage'>Total Usage</TableHeaderColumn>
                  <TableHeaderColumn dataSort={true} dataField='rate'>Hourly Rate</TableHeaderColumn>
                  <TableHeaderColumn dataSort={true} dataField='Total Cost'>Total Cost</TableHeaderColumn>
             </BootstrapTable>
        );
  }
}

export default Equipment;
