import React, { Component } from 'react';
import { PieChart, Pie, Sector, Cell, Tooltip } from 'recharts'

const data = [{name: 'Equipment', value: 400}, {name: 'Misc.', value: 300},
              {name: 'Labor', value: 300}, {name: 'Materials', value: 200}];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default class SimplePieChart extends Component {
    render() {
        return (
            <PieChart width={600} height={400} onMouseEnter={this.onPieEnter}>
                <Pie
                    data={data}
                    cx={300}
                    cy={200}
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    label
                >
                {
                    data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                }
                </Pie>
                <Tooltip/>
            </PieChart>
        );
    }
}
