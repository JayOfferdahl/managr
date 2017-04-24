import React from 'react';

import MaterialsTable from './MaterialsTable'

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import '../../assets/css/react-bootstrap-table.css';

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
                        { 'Material Name': 'Cookie Dough',
                          'Unit': 'buckets',
                          'Cost Per Unit': 20,
                          'Total Usage': 850,
                        },
                        { 'Material Name': 'Diesel, Offroad',
                          'Unit': 'gallons',
                          'Cost Per Unit': 3.61,
                          'Total Usage': 450,
                        },
                        { 'Material Name': 'Diesel',
                          'Unit': 'gallons',
                          'Cost Per Unit': 4.34,
                          'Total Usage': 1824,
                        },
                        { 'Material Name': 'Bacon',
                          'Unit': 'hawg lbs',
                          'Cost Per Unit': 5,
                          'Total Usage': 4500,
                        },
                        { 'Material Name': 'R13 Insulation',
                          'Unit': 'cubic ft.',
                          'Cost Per Unit': 0.43,
                          'Total Usage': 9023,
                        },
                        { 'Material Name': 'Asbestos',
                          'Unit': 'lungs',
                          'Cost Per Unit': .01,
                          'Total Usage': 999999999,
                        },
                        { 'Material Name': 'Salt',
                          'Unit': 'pillars',
                          'Cost Per Unit': 69,
                          'Total Usage': 420,
                        },
                        { 'Material Name': 'Asphalt',
                          'Unit': 'tons',
                          'Cost Per Unit': 63.01,
                          'Total Usage': 54,
                        },
                        { 'Material Name': 'Toilet Paper',
                          'Unit': 'miles',
                          'Cost Per Unit': 2500,
                          'Total Usage': 990,
                        },

                      ]
function _addCost(row) {
  row['Total Cost'] = "$" + Math.round(row['Cost Per Unit'] * row['Total Usage'] * 100)/100 ;
  row['Cost Per Unit'] = "$" + row['Cost Per Unit'];
  return row;
}

class Materials extends React.Component {
    // render () {
    //     return <MaterialsTable headers={MOCK_HEADERS} rows={MOCK_DATA_ROWS}/>
    // }

    render() {
      MOCK_DATA_ROWS.map(_addCost);

    return (
         <BootstrapTable data={MOCK_DATA_ROWS} striped hover pagination>
              <TableHeaderColumn isKey={true} dataSort={true} dataField='Material Name'>Material Name</TableHeaderColumn>
              <TableHeaderColumn dataSort={true} dataField='Unit'>Unit</TableHeaderColumn>
              <TableHeaderColumn dataSort={true} dataField='Cost Per Unit'>Cost Per Unit</TableHeaderColumn>
              <TableHeaderColumn dataSort={true} dataField='Total Usage'>Total Usage</TableHeaderColumn>
              <TableHeaderColumn dataSort={true} dataField='Total Cost'>Total Cost</TableHeaderColumn>
         </BootstrapTable>
    );
  }
}

export default Materials;
