import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { v4 as uuidv4 } from 'uuid';

import { Button, Stack, TextField, Typography } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: '90vw',
    },
  },
};

function getStyles(name, productsIndexes, theme) {
  return {
    fontWeight:
      productsIndexes.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : 'bold',
  };
}

export default function SelectProductos({ listoParaGuardar, setListoParaGuardar, guardarClick }) {
  const theme = useTheme();
  const [productos, setProductos] = React.useState([]);
  const [productsIndexes, setProductsIndexes] = React.useState([]);
  const [productosVendidos, setProductosVendidos] = React.useState([]);
  const [cantidades, setCantidades] = React.useState({});
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    const cargaInicial = JSON.parse(localStorage.getItem('inventario'));
    setProductos(cargaInicial || []);
  }, []);
  React.useEffect(() => {
    const copiaProductos = JSON.parse(JSON.stringify(productos));
    const copiaProductosInventario = JSON.parse(JSON.stringify(productos));


    let productosNew = [];

    if (listoParaGuardar && guardarClick) {

      const ventasAnteriores = localStorage.getItem('ventas') ? JSON.parse(localStorage.getItem('ventas')) : [];

      const fecha = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      const nuevaVenta = {
        id: uuidv4(),
        total,
        fecha: fecha.toLocaleDateString('es-ES', options)
      }
      ventasAnteriores.push(nuevaVenta)
      localStorage.setItem('ventas', JSON.stringify(ventasAnteriores))
      productsIndexes.map(e => {
        const cantidadVendida = parseInt(cantidades[e]) || 1;

        copiaProductos[e].cantidad = cantidadVendida;
        Object.assign(copiaProductos[e], { total: cantidadVendida * copiaProductos[e].precioVenta });

        Object.assign(copiaProductos[e], { idVenta: nuevaVenta.id });
        const restaTotal = productos[e].cantidad - cantidadVendida;
        copiaProductosInventario[e].cantidad = restaTotal;
        productosNew.push(copiaProductos[e])

      })
      const productosVendidosAnteriores = localStorage.getItem('inventario-vendido') ? JSON.parse(localStorage.getItem('inventario-vendido')) : [];
      const productosActualizados = productosVendidosAnteriores.concat(productosNew);
      localStorage.setItem('inventario-vendido', JSON.stringify(productosActualizados))
      localStorage.setItem('inventario', JSON.stringify(copiaProductosInventario))

    }
  }, [guardarClick])
  React.useEffect(() => {
    let nuevoTotal = 0;
    productsIndexes.forEach(index => {
      const producto = productos[index];
      const cantidad = cantidades[index] || 1;
      nuevoTotal += producto.precioVenta * cantidad;
    });
    setTotal(nuevoTotal);
    if (productsIndexes.length > 0) {
      setListoParaGuardar(true)
    } else {
      setListoParaGuardar(false)
    }
  }, [cantidades, productsIndexes, productos]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const selectedIndexes = typeof value === 'string' ? value.split(',') : value;
    setProductsIndexes(selectedIndexes);

    const nuevosProductosVendidos = selectedIndexes.map(index => productos[index]);
    setProductosVendidos(nuevosProductosVendidos);

  };


  const handleCantidadChange = (index, newCantidad,i) => {
    if(newCantidad > productosVendidos[i].cantidad){
      console.log('mayor que cantidad')
      setCantidades(prev => ({
        ...prev,
        [index]: productosVendidos[i].cantidad,
      }));
    }else if(newCantidad <=0){
      console.log('menor igual que cantidad')

      setCantidades(prev => ({
        ...prev,
        [index]: 1,
      }));
    }else{
      setCantidades(prev => ({
        ...prev,
        [index]: newCantidad,
      }));
    }
    
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: "90vw" }}>
        <InputLabel id="demo-multiple-chip-label">Productos</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={productsIndexes}
          onChange={handleChange}
          input={<OutlinedInput style={{ width: '90vw' }} id="select-multiple-chip" label="Productos" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={productos[value].producto + ' (' + productos[value].cantidad + ')'} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {productos.map((prod, index) => (
            <MenuItem
              key={prod.id}
              value={index}
              disabled={parseInt(prod.cantidad) <= 0 ? true : false}
              style={getStyles(index, productsIndexes, theme)}
            >
              {prod.producto + ' (' + prod.cantidad + ')'}
            </MenuItem>
          ))}
        </Select>
        {productsIndexes.length > 0 &&
          productsIndexes.map((e, index) => {
            return (
              <Stack direction="row" justifyContent="space-between" alignItems={'center'} mt={5} sx={{ height: "70px", width: '90vw' }} mb={2} key={e}>
                <Typography color="primary" fontWeight={800}>{index + 1 + ') ' + productos[e].producto}</Typography>
                <Stack direction={'row'} justifyContent={'flex-end'} alignItems={'center'} width={'50%'}>
                  <TextField
                    sx={{ width: "80px", marginRight: "10px" }}
                    label="Cantidad"
                    type={'number'}
                    inputProps={{
                      min: 1,
                      max: productos[e].cantidad,
                      defaultValue: 1
                    }}
                    value={cantidades[e] || 1}
                    onChange={(e) => handleCantidadChange(e.target.name, e.target.value, index)}
                    name={e}
                  />
                  <Stack direction='column' width='180px'>
                    <Typography fontWeight={800}>Precio unitario: ${productos[e].precioVenta}</Typography>
                    <Typography fontWeight={800}>Subtotal: ${productos[e].precioVenta * (cantidades[e] || 1)}</Typography>
                  </Stack>
                </Stack>
              </Stack>)
          })
        }
      </FormControl>
      <Typography color="primary" fontWeight={800} variant='h3'>TOTAL: ${total}</Typography>

    </div>
  );
}
