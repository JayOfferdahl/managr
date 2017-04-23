import React from 'react';

import MaterialsTable from './MaterialsTable'

import '../../assets/css/App.css';

const MOCK_HEADERS = ['Result','Material Name','Unit','Cost Per Unit','Total Usage','Total Expense']

const MOCK_DATA_ROWS = [{ 'Material Name': 'Bricks',
                          'Unit': 'brick',
                          'Cost Per Unit': 0.85,
                          'Total Usage': 23400,
                        },
                        { 'Material Name': 'Concrete',
                          'Unit': 'cubic ft.',
                          'Cost Per Unit': 3.12,
                          'Total Usage': 4500,
                        },
                        { 'Material Name': 'Gravel',
                          'Unit': 'tons',
                          'Cost Per Unit': 36.10,
                          'Total Usage': 45,
                        },
                      ]

class Materials extends React.Component {
    render () {
        return <MaterialsTable headers={MOCK_HEADERS} rows={MOCK_DATA_ROWS}/>
    }
}

export default Materials;
