import { Box, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import GananciasProductos from '../../components/stats/GananciasProductos';
import GananciasCategorias from '../../components/stats/GananciaCategorias';

const EstadisticasComp = () => {
  const [ganancias, setGanancias] = useState([]);

  useEffect(()=>{
    const inventarioLS = localStorage.getItem('inventario') ? JSON.parse(localStorage.getItem('inventario')) : [];
    const inventarioVendidoLS = localStorage.getItem('inventario-vendido') ? JSON.parse(localStorage.getItem('inventario-vendido')) : [];
    setGanancias(
       inventarioLS.map(
        cat=>{return {producto: cat.producto,categoria:cat.categoria,ganancia: inventarioVendidoLS.filter(e=>e.producto === cat.producto).reduce((acumulador, actual) => acumulador + ((actual.precioVenta-actual.precioCompra)*actual.cantidad), 0).toFixed(2)}}
      )
      )

      
  },[])

  return (
    <Stack direction="column" alignItems={"center"} justifyContent={"center"} style={{background: "#fff",width:"100%"}}>
      {ganancias.length > 0 ? 
      <>
                  <GananciasCategorias data={ganancias}/>

                  <GananciasProductos data={ganancias}/>


            </>
            :

    <Typography  color="primary" fontWeight={800}> No hay ventas realizadas</Typography>

      }
    </Stack>
  )
}

export default EstadisticasComp