import { InvertColorsOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Colors } from '../../utils/Colors';

const EstadisticasComp = () => {
  const [inventario, setInventario] = useState([])
  const [inventarioVendido, setInventarioVendido] = useState([]);
  const categoria = ['Computadoras', 'Teléfonos','Accesorios', 'Periféricos','Redes']
  const colorSpan = Colors.secondary.contrastText;
  useEffect(()=>{
    const inventarioLS = localStorage.getItem('inventario') ? JSON.parse(localStorage.getItem('inventario')) : [];
    const inventarioVendidoLS = localStorage.getItem('inventario-vendido') ? JSON.parse(localStorage.getItem('inventario-vendido')) : [];
    setInventario(inventarioLS);
    setInventarioVendido(inventarioVendidoLS);
    
  },[])
  return (
    <Box p={5}>
    <Typography color="primary" fontWeight={800}> Inventario</Typography>
    <Typography fontWeight={800}>Ganancia estimada:<span style={{color: colorSpan}}> ${inventario.reduce((acumulador, actual) => acumulador + ((actual.precioVenta - actual.precioCompra)*actual.cantidad), 0).toFixed(2)}</span></Typography>
    <Typography fontWeight={800}>Costo: <span style={{color: colorSpan}}>${inventario.reduce((acumulador, actual) => acumulador + ((actual.precioCompra)*actual.cantidad), 0).toFixed(2)} </span></Typography>
    <Typography fontWeight={800}>Total a vender a precio venta:<span style={{color: colorSpan}}> ${inventario.reduce((acumulador, actual) => acumulador + ((actual.precioVenta)*actual.cantidad), 0).toFixed(2)}</span></Typography>

    <Typography fontWeight={800}>Cantidad total: <span style={{color: colorSpan}}>{inventario.reduce((acumulador, actual) => acumulador + parseInt(actual.cantidad,) 0)}</span></Typography>
    <Typography color="primary" fontWeight={800}> Ventas</Typography>

    <Typography fontWeight={800}>Ganancia de productos vendidos: <span style={{color: colorSpan}}>${inventarioVendido.reduce((acumulador, actual) => acumulador + ((actual.precioVenta - actual.precioCompra)*actual.cantidad), 0).toFixed(2)}</span></Typography>
    <Typography fontWeight={800}>Total vendido (precio de venta): <span style={{color: colorSpan}}>${inventarioVendido.reduce((acumulador, actual) => acumulador + ((actual.precioVenta)*actual.cantidad), 0).toFixed(2)}</span></Typography>
    <Typography color="primary" fontWeight={800}> Ganancias obtenidas por categoría</Typography>
    {
      categoria.map(cat=><Typography fontWeight={800}>Total de categoría {cat}: <span style={{color: colorSpan}}>${inventarioVendido.filter(e=>e.categoria === cat).reduce((acumulador, actual) => acumulador + ((actual.precioVenta-actual.precioCompra)*actual.cantidad), 0).toFixed(2)}</span></Typography>)
    }
    <Typography color="primary" fontWeight={800}> Ganancias obtenidas por producto</Typography>
    {
      inventario.map(cat=><Typography fontWeight={800}>Total de {cat.producto}: <span style={{color: colorSpan}}>${inventarioVendido.filter(e=>e.producto === cat.producto).reduce((acumulador, actual) => acumulador + ((actual.precioVenta-actual.precioCompra)*actual.cantidad), 0).toFixed(2)}</span></Typography>)
    }
    


    </Box>
  )
}

export default EstadisticasComp