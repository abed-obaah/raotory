import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';
import { platforms } from './webUsageStats';

const palette = ['lightcoral', 'slateblue'];

const colorPerItem = [
  { ...platforms[0], color: 'orange' },
  { ...platforms[1], color: 'gray' },
];

export default function PieColor() {
  const data = [
    { id: 1, value: 50, label: 'Male', color: '#0E90DA' },
    { id: 0, value: 15, label: 'Female', color: '#001B2A' },
    { id: 2, value: 0, label: 'Prefer not to say', color: '#CA0000' },
  ];

  return (
    <Stack direction="column" width="100%" textAlign="center" spacing={1} alignItems="center">
       <Box flexGrow={1}>
        {/* <Typography>Default</Typography> */}
        <PieChart
          series={[
            {
              data: platforms,
            },
          ]}
          {...pieParams}  // Pass in the modified pieParams with larger dimensions
        />
      </Box>
     
      <Box>
        {data.map((item) => (
          <div key={item.id} style={{ margin: '5px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Rounded Colored Box */}
            <div style={{ width: '30px', height: '10px', backgroundColor: item.color, marginRight: '8px', borderRadius: '7.5px' }}></div>
            {/* Label with fixed width */}
            <div style={{ width: '150px', textAlign: 'left' }}>
              <p>{item.label}</p>
            </div>
          </div>
        ))}
      </Box>
    </Stack>
  );
}

// Increase the height and width of the pie chart
const pieParams = {
  height: 200,  // Increased height
  width: 200,   // Added width to ensure it's larger
  margin: { right: 5 },
  slotProps: { legend: { hidden: true } },
};
