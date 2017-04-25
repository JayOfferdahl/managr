import React from 'react';

import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import '../../assets/css/react-bootstrap-table.css';

import LaborTable from './LaborTable'

import '../../assets/css/App.css';

const MOCK_HEADERS = ['Result','Employee Name','Position','Hourly Rate','Total Hrs. Worked','Total Expense']

const MOCK_DATA_ROWS = [{ 'Employee Name': 'Richard Smith Jr.',
                          'Position': 'Builder II',
                          'Hourly Rate': 56.67,
                          'Total Hrs. Worked': 34.5,
                        },
                        { 'Employee Name': 'Warren Adams',
                           'Position': 'Welder',
                           'Hourly Rate': 78.10,
                           'Total Hrs. Worked': 14.3,
                        },
                        { 'Employee Name': 'Andrew Macon',
                           'Position': 'Foreman',
                           'Hourly Rate': 66.12,
                           'Total Hrs. Worked': 45.5,
                        },
                        { 'Employee Name': 'Ben Davidson',
                           'Position': 'Basket Weaver',
                           'Hourly Rate': 85,
                           'Total Hrs. Worked': 40,
                        },
                        { 'Employee Name': 'Jay Offerdahl',
                           'Position': 'Craft Services',
                           'Hourly Rate': 102,
                           'Total Hrs. Worked': 65,
                        },
                        { 'Employee Name': 'Chad Papineau',
                           'Position': 'Mime',
                           'Hourly Rate': 4,
                           'Total Hrs. Worked': 96.5,
                        },
                        { 'Employee Name': 'Evan Nichols',
                           'Position': 'Google',
                           'Hourly Rate': '10^100',
                           'Total Hrs. Worked': 1,
                        },
                        { 'Employee Name': 'Dravid Joseph',
                           'Position': 'Accountant',
                           'Hourly Rate': 125,
                           'Total Hrs. Worked': 20,
                        },
                        { 'Employee Name': 'Adam Thompson',
                           'Position': 'Bearded Lady',
                           'Hourly Rate': 0,
                           'Total Hrs. Worked': 120,
                        },
                        { 'Employee Name': 'Jack Handey',
                           'Position': 'Lift Operator',
                           'Hourly Rate': 55,
                           'Total Hrs. Worked': 30,
                        },
                        { 'Employee Name': 'Mick Foley',
                           'Position': 'WWF Champion 1998-1999',
                           'Hourly Rate': 500,
                           'Total Hrs. Worked': 120,
                        },
                      ]

function _addPay(row) {
  row['Total Pay'] = "$" + Math.round(row['Hourly Rate'] * row['Total Hrs. Worked'] * 100)/100 ;
  if(isNaN(row['Hourly Rate'] * row['Total Hrs. Worked'])){
    row['Total Pay'] = "$" + row['Hourly Rate'];
  }
  return row;
}
class Labor extends React.Component {
    render () {
        MOCK_DATA_ROWS.map(_addPay);
        // return (
        //     <LaborTable headers={MOCK_HEADERS} rows={MOCK_DATA_ROWS} />
        // );
        return (
             <BootstrapTable data={MOCK_DATA_ROWS} striped hover pagination>
                  <TableHeaderColumn isKey={true} dataSort={true} dataField='Employee Name'>Employee Name</TableHeaderColumn>
                  <TableHeaderColumn dataSort={true} dataField='Position'>Position</TableHeaderColumn>
                  <TableHeaderColumn dataSort={true} dataField='Hourly Rate'>Hourly Rate</TableHeaderColumn>
                  <TableHeaderColumn dataSort={true} dataField='Total Hrs. Worked'>Total Hrs. Worked</TableHeaderColumn>
                  <TableHeaderColumn dataSort={true} dataField='Total Pay'>Total Pay</TableHeaderColumn>
             </BootstrapTable>
        );
    }
}

export default Labor;
