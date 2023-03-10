import React from 'react'
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { generateColor } from '../../helpers';

export default function PieChartCustomized(props) {
  return (
    <div>
      <h3>{props.title}</h3>
      <PieChart width={300} height={300}>
        <Pie
          data={props.data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({percent})=>`${percent*100}%`}
          outerRadius={80}
          dataKey="value"
        >
          {props.data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={generateColor()} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  )
}
