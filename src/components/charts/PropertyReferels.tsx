import React from 'react'
import { Box,Typography,Stack } from '@mui/material'
import { propertyReferralsInfo } from 'constants/index'
interface ProgressBarProps{
  title:string,
  percentage:number,
  color:string,
}
const ProgressBar=({title,percentage,color}:ProgressBarProps)=>(
  <Box
  width="100%"
  >
    <Stack direction="row" alignItems="center" justifyContent="space-between">
       <Typography fontSize={16} fontWeight={500} color="#11142d">{title}</Typography>
       <Typography fontSize={16} fontWeight={500} color="#11142d">{percentage}%</Typography>
    </Stack>
    <Box mt={2} position="relative" width="100%" height="8px" borderRadius={1} bgcolor="#ffffff">
      <Box width={`${percentage}%`}
      bgcolor={color}
      position="absolute"
      height="100%"
      borderRadius={1}
      >

      </Box>
    </Box>


  </Box>
)

const PropertyReferels = () => {
  return (
     <Box
    p={4}
    bgcolor="#F3F5FB"
    display="flex"
    id="chart"
    minWidth={490}
    flexDirection="column"
    borderRadius="15px"
    >
      <Typography fontSize={18} fontWeight={500} color="#11142d">Property Referrals</Typography>
      <Stack my="20px" direction="column" gap={4}>
        {propertyReferralsInfo.map((bar) =>
         <ProgressBar key={bar.title} {... bar}/>
        )}
      </Stack>
    </Box>
  )
}

export default PropertyReferels