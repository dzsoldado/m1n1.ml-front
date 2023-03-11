import { Typography, Button, Box } from '@mui/material';
import React from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

export default function LineChartCustomized(props) {
  return (
    <div>
      <Typography textAlign="center" component="h2" variant="h5" >{props.title}</Typography>
      <Typography textAlign="center" component="h2" variant="h6" >{`${props.month+1} / ${props.year}`}</Typography>
      <div style={{marginBottom: '4rem'}}>
        <Button onClick={props.decrementMonth}>Previous month</Button>
        <Button onClick={props.incrementMonth}>Next month</Button>
      </div>
      <Box sx={{ width: 'auto', overflowX: 'auto', minHeight: '325px'}}>
        <AreaChart
          width={1100}
          height={300}
          data={props.data}

        >
          <CartesianGrid strokeDasharray="1 6" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="value" stroke="#3182bd" activeDot={{ r: 8 }} />
        </AreaChart>
      </Box>
    </div>
  )
}
