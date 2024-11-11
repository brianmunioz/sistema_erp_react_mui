import { Button, Link, Stack, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Colors } from '../utils/Colors';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Stack direction={"column"} width="100vw" height="100vh" backgroundColor={Colors.cuaternary.main} justifyContent={"center"} alignItems={"center"}>
        <img src="/logo.png" width={"200px"} height={"200px"}/>
        <Button onClick={()=>navigate('/productos')} variant="contained" color='primary'sx={{color:"#fff", fontWeight: "bold"}}>
          Ingresar
          </Button>
      
    </Stack>
  )
}

export default HomePage