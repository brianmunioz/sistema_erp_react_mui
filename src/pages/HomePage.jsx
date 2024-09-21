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
       <Link 
       href="https://appsbucket.space" 
       mt={5} 
       height={"20px"} 
       sx={{
        cursor: "pointer",
        "&:hover": {
      color: "#371B58" 
    }}} 
    underline="none" 
    target="_blank" 
    fontWeight={800} 
    color="#371B58">Powered by <img src='/appsbucket.svg' style={{position: "relative", top: "16px"}} width={"40px"} height={"40px"}/> Apps Bucket</Link>
    </Stack>
  )
}

export default HomePage