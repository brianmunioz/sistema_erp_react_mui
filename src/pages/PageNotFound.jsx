import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Stack direction={"column"} width="100vw" height="100vh" backgroundColor={"#F45C5C"} justifyContent={"center"} alignItems={"center"}>
        <img src="/logo.png" width={"200px"} height={"200px"}/>
        <Typography color="#fff" variant="h4" mb={2}fontWeight={800}>Página no encontrada</Typography>
        <Button onClick={()=>navigate('/')} variant="contained" color='primary'sx={{color:"#fff", fontWeight: "bold"}}>Volver a inicio</Button>
    </Stack>
  )
}

export default PageNotFound