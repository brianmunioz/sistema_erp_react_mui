import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Colors } from '../../utils/Colors';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

 const EliminarDialog = ({abrir,setAbrir,aceptarFuncion,producto = ""})=> {

 

  const handleClose = () => {
    setAbrir(false);
  };

  return (
      <Dialog
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: Colors.cuaternary.main, // Cambia el color de fondo
           // Cambia el color del texto
        },
      }}
        open={abrir}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Está a punto de eliminar un producto"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            ¿Está seguro que desea eliminar el producto {producto} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='inherit' onClick={handleClose}>Cancelar</Button>
          <Button sx={{color: '#F45C5C', fontWeight: "bold"}} fontWeigth="bold" onClick={()=>{
            
            aceptarFuncion()
            handleClose()
            }}>Sí, eliminar</Button>
        </DialogActions>
      </Dialog>
  
  );
}
export default EliminarDialog