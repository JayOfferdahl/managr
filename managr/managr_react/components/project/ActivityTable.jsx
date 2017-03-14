import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

import '../../assets/css/App.css';

class ActivityTable extends React.Component {

  _makeTD(str){
      return <td key={str}>{str}</td>
  }

  // EQUIPMENT TABLE
  // Result No. | Equipment Name | Hourly Rate ($) | Total Expense
  _renderRow(row,i){
    var ans = [];
    ans.push(this._makeTD(i))
    ans.push(this._makeTD(row['Message']))
    ans.push(this._makeTD(row['Timestamp']))
    return ans;
  }

  _renderBody(rows){
    let ans = []
    rows.forEach((row, i) => {
      ans.push(<tr key={i}>{this._renderRow(row,i)}</tr>);
    })
    return ans;
  }

  render() {
    return (
      <Table className="summary-table" striped bordered condensed hover>
        <thead>
          <tr>
            {this.props.headers.map((h) => {return <th key={h} className="table-header">{h}</th> })}
          </tr>
        </thead>
        <tbody>
          {this._renderBody(this.props.rows)}
        </tbody>
      </Table>
    )
  }
}

export default ActivityTable
