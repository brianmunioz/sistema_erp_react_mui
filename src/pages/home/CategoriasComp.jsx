import { Alert, Button, Snackbar, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Colors } from '../../utils/Colors';
import EliminarDialog from '../../components/dialogs/EliminarDialog';


const CategoriasComp = () => {
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [categorias,setCategorias] = useState(localStorage.getItem('categorias') ? JSON.parse(localStorage.getItem('categorias')):['prueba'])
  const [eliminar, setEliminar] = useState("");
  const [catEliminar, setCatEliminar] = useState("");
  const [exito, setExito] = useState(false);
  const [error, setError] = useState(false);

  

  const onChangeCategoria = async (e) => {
    const valor = e.target.value.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    if (valor.length <= 12) setNuevaCategoria(valor);
  }
  const eliminarCategoria = () => {
    const categoriasActualizadas = categorias.filter(e=> e!=catEliminar)
    localStorage.setItem('categorias',JSON.stringify(categoriasActualizadas))
    setCategorias(categoriasActualizadas);
  }
  const agregarCategoria = () => {
    if(categorias.includes(nuevaCategoria)){
      setError(true);
    }
    else if(!exito && nuevaCategoria.length > 0 ){
      setCategorias(prev=>[...prev,nuevaCategoria])
      localStorage.setItem('categorias', JSON.stringify([...categorias,nuevaCategoria]))
      setExito(true)
      setNuevaCategoria("");
    }
  }
  return (
    <Stack width="100%" pt={2} direction={"column"}>
      <Stack direction="row" alignItems={'flex-end'} mb={5}>

        <TextField value={nuevaCategoria} onChange={e => onChangeCategoria(e)} label="Categoria" variant="standard"  ></TextField>
        <Button variant="contained" sx={{ fontWeight: 800, height: "40px", marginLeft: "20px" }} color="secondary" onClick={agregarCategoria} >Agregar</Button>
      </Stack>
     {categorias && categorias.length > 0 ? 
     categorias.map(cat=> <Stack direction="row" mb={2} alignItems={"center"} justifyContent={"space-between"} sx={{ display: "inline-flex", width: "320px", padding: "10px", border: "2px solid " + Colors.primary.main, borderRadius: "20px", }}>

      <Typography variant="h6" fontWeight={800} color={Colors.primary.main} mr={2}>{cat}</Typography>
      <DeleteIcon onClick={() => {
        setCatEliminar(cat);
        setEliminar(true)}} sx={{ color: "#F45C5C", cursor: "pointer" }} />


    </Stack>): <Typography color="primary" fontWeight={800}>No tienes categorias cargadas en el sistema</Typography>}
      <Snackbar open={exito && !eliminar} autoHideDuration={1000} onClose={() => setExito(false)}>
        <Alert

          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          La categoría se agregó con éxito
        </Alert>
      </Snackbar>
      <Snackbar open={error && !eliminar} autoHideDuration={1000} onClose={() => setError(false)}>
        <Alert

          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          La categoria ya se encuentra en la base de datos
        </Alert>
      </Snackbar>
      <EliminarDialog abrir={eliminar} setAbrir={setEliminar} producto={nuevaCategoria} titulo="Está a punto de eliminar una categoria" pregunta={"Esta seguro que desea eliminar la categoría "} aceptarFuncion={() => eliminarCategoria()} />

    </Stack>
  )
}

export default CategoriasComp