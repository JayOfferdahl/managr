import React, { Component } from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

const data = [
      {name: '1/21', equip: 40, labor: 24, amt: 24},
      {name: '1/22', equip: 30, labor: 13, amt: 22},
      {name: '1/23', equip: 20, labor: 98, amt: 22},
      {name: '1/24', equip: 27, labor: 39, amt: 20},
      {name: '1/25', equip: 18, labor: 48, amt: 21},
      {name: '1/26', equip: 23, labor: 38, amt: 25},
      {name: '1/27', equip: 34, labor: 43, amt: 21},
];

export default class SimpleLineChart extends Component {
  render() {
    return (
      <LineChart width={600} height={300} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Line type="monotone" dataKey="labor" stroke="#8884d8" activeDot={{r: 8}}/>
       <Line type="monotone" dataKey="equip" stroke="#82ca9d" />
      </LineChart>
    );
  }
}
