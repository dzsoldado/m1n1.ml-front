import React from 'react'
import { Typography } from '@mui/material';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { colors } from '../../helpers';

export default function PieChartCustomized(props) {
  return (
    <div>
      <Typography textAlign="center" component="h2" variant="h5">{props.title}</Typography>
      <PieChart width={330} height={250}>
        <Pie
          data={props.data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({percent})=>`${(percent*100).toString().slice(0,5)}%`}
          outerRadius={80}
          dataKey="value"
        >
          {props.data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index%colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  )
}
