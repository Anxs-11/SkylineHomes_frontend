import { Box,Typography,Stack } from '@mui/material'

import React, { useContext } from "react";
import ReactApexChart from "react-apexcharts"

import {PieChartProps} from 'interfaces/home'
import { ColorModeContext } from "../../contexts/color-mode";

const PieChart = ({title,value,series,colors}:PieChartProps) => {
  const { mode, setMode } = useContext(ColorModeContext);
  let color="#fcfcfc";
  {mode === "dark" ? color="#161616" : color="#F3F5FB"}
  return (

    <Box
      
      id="chart"
      flex={1}
      display="flex"
      bgcolor={color}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      pl={3.5}
      py={2}
      gap={2}
      // mr="20px"
      // mb="20px"
      borderRadius="15px"
      minHeight="110px"
      width="fit-content"
      
    >
      <Stack direction="column">
        <Typography fontSize={14}  >{title} </Typography>
        <Typography fontSize={24}  fontWeight={600} mt={1}>{value} </Typography>
      </Stack>
      <ReactApexChart
        options={{
          chart:{type:"donut"},
          colors,
          legend:{show:false},
          dataLabels:{enabled:false},
          stroke: {
              show: false,
              width:0
              },
        
        }}
        series={series}
        type="donut"
        width="120px"
        
      />
    </Box>
  )
}

export default PieChart