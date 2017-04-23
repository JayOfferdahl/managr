import React from 'react';

import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

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
                      ]

class Labor extends React.Component {
    render () {
        return (
            <LaborTable headers={MOCK_HEADERS} rows={MOCK_DATA_ROWS} />
        );
    }
}

export default Labor;
