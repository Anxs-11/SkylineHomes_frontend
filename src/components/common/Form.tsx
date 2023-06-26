import React from 'react'
import {Box,Typography,FormControl,FormHelperText,TextField,TextareaAutosize,Stack,Select,MenuItem,Button} from 
"@mui/material"
import {FormProps} from "interfaces/common"
import CustomButton from "./CustomButton";
const Form = ({type,register,handleSubmit,handleImageChange,formLoading,onFinishHandler,propertyImage}:FormProps) => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={600} color="#11142d">{type} a Property</Typography>
      <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#F3F5FB">
        <form style={{marginTop:'20px', width:'100%' ,display:'flex',flexDirection:'column',gap:'20px'}}
        onSubmit={handleSubmit(onFinishHandler)}
        >
          <FormControl>
            <FormHelperText sx={{fontWeight:500 , margin:'10px',fontSize:16,color:'#11142d'}}>Enter Property Name</FormHelperText>
            <TextField
            fullWidth
            required
            id="outlined-basic"
            color="info"
            variant="outlined"
            {...register('title',{required:true})}
            />
          </FormControl>
           <FormControl>
            <FormHelperText style={{fontWeight:500 , margin:'10px',fontSize:16,color:'#11142d'}}>Property Description</FormHelperText>
            <TextareaAutosize
            minRows={5}
            required
            placeholder='Write Description'
            color="info"
            style={{
              width:'100%',background:'transparent',fontSize:'16px',borderColor:'rgba(0,0,0,0.23)',borderRadius:6,padding:10 
            }}{...register('description',{required:true})}

            />
          </FormControl>
            <Stack direction='row' gap={4}>
              <FormControl sx={{flex:1}}>
                <FormHelperText sx={{
                  fontWeight:500,
                  margin:'10px 0',
                  fontSize:16,
                  color:'#11142d'
                }}>
                  Select Property Type
                </FormHelperText>
                <Select
                 variant="outlined"
                 color="info"
                 displayEmpty
                 required
                 inputProps={{'aria-label':'Without label'}}
                 defaultValue="apartment"
                 {...register('propertyType',{required:true})}
                >
                  <MenuItem value="apartment">Apartment</MenuItem>
                  <MenuItem value="villa">Villa</MenuItem>
                  <MenuItem value="farmhouse">FarmHouse</MenuItem>
                  <MenuItem value="townhouse">TownHouse</MenuItem>
                  <MenuItem value="duplex">Duplex</MenuItem>
                  <MenuItem value="penthouse">PentHouse</MenuItem>
                </Select>
              </FormControl>
               <FormControl>
            <FormHelperText sx={{fontWeight:500 , margin:'10px',fontSize:16,color:'#11142d'}}>Enter Property Price</FormHelperText>
            <TextField
            fullWidth
            required
            type="number"
            id="outlined-basic"
            color="info"
            variant="outlined"
            {...register('price',{required:true})}
            />
          </FormControl>
            </Stack>
             <FormControl>
            <FormHelperText sx={{fontWeight:500 , margin:'10px',fontSize:16,color:'#11142d'}}>Enter Location</FormHelperText>
            <TextField
            fullWidth
            required
            id="outlined-basic"
            color="info"
            variant="outlined"
            {...register('location',{required:true})}
            />
          </FormControl>
          <Stack direction="column" gap={1} justifyContent="center" mb={2}>
            <Stack direction="row" gap={2}>
              <Typography color='#11142d' fontSize={16} fontWeight={500} my="10px">Property Photo</Typography>
              <Button component="label" sx={{width:'fit-content',color:'#2ed480',textTransform:"capitalize", fontSize:16 , borderBottom:'2px solid #2ed480' ,borderRadius:'0'}}>
                Upload *
                <input 
                  hidden 
                  accept="image/*"
                  type="file"
                  // @ts-ignore
                  onChange={(e)=>{handleImageChange(e.target.files[0])}}
                />
              </Button>
            </Stack>
            <Typography fontSize={14} color='#808191' sx={{ wordBreak:'break-all'}}>{propertyImage?.name}</Typography>

          </Stack>
          <CustomButton type="submit"
            title={formLoading?'Submitting...':'Submit'}
            backgroundColor="#475be8" color="#fcfcfc" 
          />
        </form>
      </Box>
    </Box>
  )
}

export default Form