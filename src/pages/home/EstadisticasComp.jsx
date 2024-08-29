import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Colors } from '../../utils/Colors';
import GananciasProductos from '../../components/stats/GananciasProductos';
import GananciasCategorias from '../../components/stats/GananciaCategorias';

const EstadisticasComp = () => {
  const [inventario, setInventario] = useState([])
  const [inventarioVendido, setInventarioVendido] = useState([]);
  const [ganancias, setGanancias] = useState([]);
  const [gananciasCat, setGananciasCat] = useState([]);

  const categoria = ['Computadoras', 'Teléfonos','Accesorios', 'Periféricos','Redes']
  const colorSpan = Colors.secondary.contrastText;
  useEffect(()=>{
    const inventarioLS = localStorage.getItem('inventario') ? JSON.parse(localStorage.getItem('inventario')) : [];
    const inventarioVendidoLS = localStorage.getItem('inventario-vendido') ? JSON.parse(localStorage.getItem('inventario-vendido')) : [];
    setInventario(inventarioLS);
    setInventarioVendido(inventarioVendidoLS);
    setGanancias(
       inventarioLS.map(
        cat=>{return {producto: cat.producto,categoria:cat.categoria,ganancia: inventarioVendidoLS.filter(e=>e.producto === cat.producto).reduce((acumulador, actual) => acumulador + ((actual.precioVenta-actual.precioCompra)*actual.cantidad), 0).toFixed(2)}}
      )
      )

      setGananciasCat(inventarioVendidoLS)
      
  },[])
  console.log(ganancias)

  return (
    <Box p={5}>
      {ganancias.length > 0 ? 
      <>
            <GananciasProductos data={ganancias}/>
            <GananciasCategorias data={ganancias}/>

            </>
            :

    <Typography  color="primary" fontWeight={800}> No hay ventas realizadas</Typography>

      }
    </Box>
  )
}

export default EstadisticasComp