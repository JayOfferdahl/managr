import React from 'react';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import SummaryTable from './SummaryTable'

import '../../assets/css/App.css';

const MOCK_HEADERS = ['Result','Equipment Name','Total Usage','Hourly Cost','Total Expense']

const MOCK_DATA_ROWS = [{ 'Equipment Name': 'JCT9000 Backhoe',
                          'Total Usage': 45.3,
                          'Hourly Cost': 120,
                        },
                        { 'Equipment Name': 'DitchWitch Driller',
                          'Total Usage': 22.1,
                          'Hourly Cost': 54,
                        },
                        { 'Equipment Name': 'Johnny On the Spot',
                          'Total Usage': 12,
                          'Hourly Cost': 15,
                        }]

class Equipment extends React.Component {
    render () {
        return <SummaryTable headers={MOCK_HEADERS} rows={MOCK_DATA_ROWS} />
    }
}

export default Equipment;
