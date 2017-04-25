import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

import '../../assets/css/finance.css';

const randRange = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

//generate random data
const genData = (size) => {
  let arr = []
  for(let i = 0; i<size; i++){

      //make some random ass data
      let uc = randRange(200,4000)
      let quant = randRange(1,45)
      let tc = uc*quant
      let bc = randRange(tc-1000,tc+1000)

      let marg = bc - tc

    arr.push({
      name: "Expenditure " + (i + 1),
      timestamp: new Date(),
      unit_price: uc,
      qty: quant,
      total_cost: tc,
      budgeted_cost: bc,
      margin: marg
    })
  }
  return arr
}

//format margin columns based on over or under budget
const marginClassNameFormat = (fieldVal, row, rowIdx, colIdx) => {
  return fieldVal < 0 ? 'td-column-overbudget' : 'td-column-underbudget'
}

//format all currency
const priceFormatter = (cell, row) => {
  return `<i class='glyphicon glyphicon-usd'></i> ${cell}`;
}

class Finance extends React.Component {
    render () {
        let curData = genData(10)

        return (
          <div className="default-content">
            <h3 className="finance-header">Finance Overview</h3>
            <BootstrapTable className="finance-table" data={curData}>
              <TableHeaderColumn dataField='name' isKey>Name</TableHeaderColumn>
              <TableHeaderColumn dataField='timestamp'>Time</TableHeaderColumn>
              <TableHeaderColumn dataSort={true} dataField='unit_price'>Unit price</TableHeaderColumn>
              <TableHeaderColumn dataField='qty'>Quantity</TableHeaderColumn>
              <TableHeaderColumn dataFormat={priceFormatter} dataField='total_cost'>True Cost</TableHeaderColumn>
              <TableHeaderColumn dataFormat={priceFormatter} dataField='budgeted_cost'>Budgeted Cost</TableHeaderColumn>
              <TableHeaderColumn dataSort={true} dataFormat={priceFormatter} columnClassName={ marginClassNameFormat } dataField='margin'>Margin</TableHeaderColumn>
            </BootstrapTable>
          </div>
        );
    }
}

export default Finance;
