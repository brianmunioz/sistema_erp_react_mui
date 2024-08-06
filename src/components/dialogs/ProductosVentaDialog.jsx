import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Stack, Typography } from '@mui/material';
import { Colors } from '../../utils/Colors';
import  html2pdf  from 'html2pdf.js';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const SpanVerde = ({msg})=>{
    return <span style={{color: Colors.secondary.contrastText, fontSize: '14px', fontWeight: "bold"}}>{msg}</span>
}

export default function ProductosVentaDialog({open, setOpen, productos, fechaVenta}) {

    const componentRef = React.useRef();
   
    //Generar pdf
    const generatePdf = (idVenta) => {
      const opt = {
        margin: 1,
        filename: "comprobante_:" + idVenta+ ".pdf",
        image: { type: "png", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };
  
      html2pdf().set(opt).from(componentRef.current).save();
    };

  const handleClose = () => {
    setOpen(false);
  };
  const totalSum = productos.reduce((accumulator, item) => {
    return accumulator + item.total;
}, 0);
  return (
      
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Comprobante de venta"}</DialogTitle>
        <DialogContent               ref={componentRef}
        >
        <Typography  fontWeight={800} variant='p'>Fecha de emisión: <SpanVerde msg={fechaVenta} /> </Typography>

          {
            productos.map((e,index)=>
                <Typography  fontSize='14px' fontWeight={800}>
                    <SpanVerde msg={index+1+') '}/> {e.producto +' - Cantidad: '}<SpanVerde msg={ e.cantidad}/> 
                    { ' - Precio unitario: '} <SpanVerde msg={'$'+e.precioVenta}/> 
                    { ' - subtotal: '} <SpanVerde msg={'$'+e.total} />
                    
                    </Typography>
           )
          }
          <Typography color='primary'  fontWeight={800} variant='p'>Total: ${totalSum}</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="primary" sx={{fontWeight: 800}}onClick={()=>{generatePdf(productos[0].idVenta)}}><PictureAsPdfIcon sx={{width: "30px", height: '30px'}}/>Descargar  </Button>
          <Button color='error' onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
  );
}
