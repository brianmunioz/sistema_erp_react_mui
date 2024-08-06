import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { visuallyHidden } from '@mui/utils';
import { Colors } from '../../utils/Colors';
import { AppBar, Button, Dialog, IconButton, Slide, Stack, LinearProgress, Alert, Snackbar } from '@mui/material';
import SelectProductos from '../selects/SelectProductos';
import ProductosVentaDialog from '../dialogs/ProductosVentaDialog';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {

  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'fecha',
    numeric: false,
    disablePadding: false,
    label: 'Fecha',
  },
  {
    id: 'total',
    numeric: true,
    disablePadding: false,
    label: 'Total',
  },
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'ID',
  }


];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead >
      <TableRow bgcolor={Colors.terciary.main}>
        <TableCell
          align={'center'}
          sx={{ fontWeight: 800, width: '80px', color: Colors.secondary.contrastText }}
        >
          Ver comprobante
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'right'}

            sx={{ fontWeight: 800, color: Colors.secondary.contrastText }}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {

  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};





const VenderComp = () => {
  const [datos, setDatos] = React.useState([]);
  const [prodVendidos, setProdVendidos] = React.useState(localStorage.getItem('inventario-vendido') ? JSON.parse(localStorage.getItem('inventario-vendido')) : []);
  const [verVenta, setVerVenta] = React.useState({ bool: false, idVenta: '' })
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('fecha');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [visibleRows, setVisibleRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [productosAmostrar, setProductosAmostrar] = React.useState([]);
  const [factura, setFactura] = React.useState(false);
  const [fecha, setFecha] = React.useState('');

  const [exito, setExito] = React.useState(false);
  const [error, setError] = React.useState({ bool: false, msg: '' })
  const [guardarClick, setGuardarClick] = React.useState(false);

  const [guardar, setGuardar] = React.useState(false)
React.useEffect(()=>{
  const inventarioVendidoLS = localStorage.getItem('inventario-vendido') ? JSON.parse(localStorage.getItem('inventario-vendido')) : [];
      setProdVendidos(inventarioVendidoLS)
},[guardarClick])
  React.useEffect(() => {
    setDatos(localStorage.getItem('ventas') ? JSON.parse(localStorage.getItem('ventas')) : [])
  }, [guardarClick])
  React.useEffect(() => {
    const newVisibleRows = stableSort(datos, getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    setVisibleRows(newVisibleRows);
  }, [datos, order, orderBy, page, rowsPerPage]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  const handleClickOpen = () => {
    setOpen(true);
  };



  const handleClose = () => {

    setOpen(false);
    setTimeout(() => {
      setGuardar(false)
      setGuardarClick(false)
    }, 500)

  };
  const mostrarVenta = (id,fechaVenta) => {
    const ventasProd = JSON.parse(JSON.stringify(prodVendidos))
    setFactura(true)
    setFecha(fechaVenta);
    setProductosAmostrar(ventasProd.filter(e => e.idVenta === id))


  }
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datos.length) : 0;

  return (
    <>
      <Box sx={{ width: '100%' }} mt={5}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <Toolbar
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
              bgcolor: Colors.cuaternary.main
            }}
          >

            <Typography
              sx={{ flex: '1 1 100%' }}
              variant="h6"
              color={'primary'}
              fontWeight={800}
              id="tableTitle"
              component="div"
            >
              Ventas
            </Typography>

            <Button variant="contained" sx={{ fontWeight: 800 }} onClick={async () => {
              handleClickOpen()
            }} color="secondary">Vender</Button>
            <Dialog
              fullScreen
              open={open}
              onClose={handleClose}
              TransitionComponent={Transition}
            >
              <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    {"Vender"}
                  </Typography>
                  <Button autoFocus color="inherit" onClick={
                    () => {
                      if (guardar) {
                        setGuardarClick(true);

                        setError({ bool: false, msg: '' })
                        setExito(true)
                        handleClose();
                      } else {
                        setExito(false)
                        setError({ bool: true, msg: 'Todavía no se puede guardar, verifique que tenga productos y sus cantidades correctas' })

                      }


                    }}
                  >
                    {"Generar venta"}
                  </Button>
                </Toolbar>
              </AppBar>
              <Stack direction={'column'} justifyContent="space-between" alignItems={'center'} p={5}>
                <SelectProductos listoParaGuardar={guardar} guardarClick={guardarClick} setListoParaGuardar={setGuardar} />
              </Stack>
            </Dialog>

          </Toolbar>
          <TableContainer>
            <Table
              sx={{ minWidth: '100%' }}
              aria-labelledby="tableTitle"
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}

              />
              <TableBody>
                {visibleRows && visibleRows.length > 0 && visibleRows.map((row, index) => {

                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover

                      tabIndex={-1}
                      key={row.id}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell sx={{ display: 'flex', justifyContent: 'center', width: '90px', cursor: 'pointer' }} onClick={() => {
                        mostrarVenta(row.id, row.fecha)
                      }} >
                        <RemoveRedEyeIcon sx={{ color: Colors.primary.main }} />
                      </TableCell>
                      <TableCell align="right">{row.fecha}</TableCell>
                      <TableCell align="right">${row.total}</TableCell>


                      <TableCell
                        component="th"
                        align='right'
                        id={labelId}
                        scope="row"

                      >
                        {row.id}
                      </TableCell>
                    </TableRow>
                  );
                })}
                {visibleRows == 0 && datos.length == 0 &&
                  <Typography color='primary'>No tiene productos cargados en su inventario</Typography>
                }
                {visibleRows == 0 && datos.length > 0 &&
                  <LinearProgress color="primary" />}
                {visibleRows.length > 0 && emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {
            visibleRows.length > 0 &&
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={datos.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          }

        </Paper>
      </Box>

      <Snackbar open={exito && !error.bool} autoHideDuration={6000} onClose={() => setExito(false)}>
        <Alert

          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Venta realizada y registrada con éxito
        </Alert>
      </Snackbar>
      <Snackbar open={error.bool && !exito} autoHideDuration={6000} onClose={() => setError({ bool: false, msg: '' })}>
        <Alert

          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >

          {error.msg}
        </Alert>
      </Snackbar>
      <ProductosVentaDialog open={factura} setOpen={setFactura} fechaVenta = {fecha} productos={productosAmostrar}/>
    </>
  );
}
export default VenderComp