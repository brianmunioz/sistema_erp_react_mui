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
import { v4 as uuidv4 } from 'uuid';

import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { visuallyHidden } from '@mui/utils';
import { Colors } from '../../utils/Colors';
import { AppBar, Button, Dialog, IconButton, Slide, Stack, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function createData(id, producto, categoria, precioCompra, precioVenta, cantidad) {
  return {
    id,
    producto,
    categoria,
    precioCompra,
    precioVenta,

    cantidad
  };
}

const rows = [
  createData(uuidv4(), 'Acer aspire 5', 'Computadoras', 1000, 1500, 67),
  createData(uuidv4(), 'Samsung s20', 'Teléfonos', 300, 600, 20),
  createData(uuidv4(), 'Smartwatch Android', 'Accesorios', 25.6, 34, 24),
  createData(uuidv4(), 'Auriculares inalambricos', 'Accesorios', 29, 32, 5),
  createData(uuidv4(), 'Monitor 4K', 'Periféricos', 75, 120, 49),
  createData(uuidv4(), 'Placa gráfica 8gb', "Periféricos", 900, 2000, 3),
  createData(uuidv4(), 'Router Wi fi', 'Redes', 9, 200, 37),
  createData(uuidv4(), 'Teclado mecánico', 'Periféricos', 390, 500, 20),
  createData(uuidv4(), 'Microfono', 'Periféricos', 26.9, 29, 65),
  createData(uuidv4(), 'IPhone X', 'Teléfonos', 300, 950.5, 28),
  createData(uuidv4(), 'Mouse inalámbrico', 'Periféricos', 20, 23, 81),
  createData(uuidv4(), 'Luces led decorativas', 'Accesorios', 19.1, 20, 9),
  createData(uuidv4(), 'Cargador de iphone', 'Accesorios', 18.23, 290, 10),
];

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
    id: 'producto',
    numeric: false,
    disablePadding: true,
    label: 'Producto',
  },
  {
    id: 'cantidad',
    numeric: true,
    disablePadding: false,
    label: 'Cantidad',
  },
  {
    id: 'precioVenta',
    numeric: true,
    disablePadding: false,
    label: 'Precio venta',
  },
  {
    id: 'categoria',
    numeric: false,
    disablePadding: false,
    label: 'Categoría',
  },
  {
    id: 'id',
    numeric: true,
    disablePadding: false,
    label: 'ID',
  },
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
          sx={{ fontWeight: 800, color: Colors.secondary.contrastText }}
        >
          Acciones

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

function EnhancedTableToolbar(props) {
  const [open, setOpen] = React.useState(false);
  const [productonuevo, setProductonuevo] = React.useState({
    producto: '',
    categoria: '',
    precioVenta: '',
    cantidad: 1
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setProductonuevo({
      producto: '',
      categoria: '',
      precioVenta: '',
      cantidad: 1
    })
    setOpen(false);
  };
  return (
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
        Stock de productos
      </Typography>

      <Button variant="contained" sx={{ fontWeight: 800 }} onClick={async () => {
        handleClickOpen()
      }} color="secondary">Agregar</Button>
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
              Agregar Producto
            </Typography>
            <Button autoFocus color="inherit" onClick={
              () => {
                console.log(productonuevo)
                const regexDecimales = /^\d*\.?\d*$/;
                const regexNaturales = /^\d*$/;
                if (!productonuevo.producto) {
                  alert("debe ingresar el nombre del producto")

                } else if (!productonuevo.cantidad || !regexNaturales.test(productonuevo.cantidad)) {
                  alert('Cantidad inválida')
                } else if (!productonuevo.precioCompra || !regexDecimales.test(productonuevo.precioCompra)) {
                  alert('precio de compra inválida')
                } else if (!productonuevo.precioVenta || !regexDecimales.test(productonuevo.precioVenta)) {
                  alert('precioVenta  ')
                }else{
                  const productosActualizados = JSON.parse(localStorage.getItem('inventario'))
                  productosActualizados.push(createData(uuidv4(),productonuevo.producto,
                  productonuevo.categoria,
                   productonuevo.precioCompra,
                  productonuevo.precioVenta,
                productonuevo.cantidad))
                  localStorage.setItem('inventario', JSON.stringify(productosActualizados))
                  alert("Producto guardado! ");
                  handleClose();
                }
              }

            }>
              Guardar
            </Button>
          </Toolbar>
        </AppBar>
        <Stack direction={'column'} justifyContent="space-between" alignItems={'center'} p={5}>
          <TextField sx={{ marginBottom: 2 }} value={productonuevo.producto} onChange={(e) => setProductonuevo({ ...productonuevo, producto: e.target.value })} fullWidth label="Nombre del producto" />
          <TextField sx={{ marginBottom: 2 }} value={productonuevo.precioCompra} onChange={(e) => setProductonuevo({ ...productonuevo, precioCompra: e.target.value })} fullWidth label="Precio de compra" />
          <TextField sx={{ marginBottom: 2 }} value={productonuevo.precioVenta} onChange={(e) => setProductonuevo({ ...productonuevo, precioVenta: e.target.value })} fullWidth label="Precio de venta" />
          <TextField type='number' sx={{ marginBottom: 2 }} value={productonuevo.cantidad} onChange={(e) => setProductonuevo({ ...productonuevo, cantidad: e.target.value })} fullWidth label="Cantidad" />
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120, width: "100%" }}>
            <InputLabel id="demo-simple-select-standard-label">Categoria</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={productonuevo.categoria} onChange={(e) => setProductonuevo({ ...productonuevo, categoria: e.target.value })}
              label="Categoria"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'Accesorios'}>Accesorios</MenuItem>
              <MenuItem value={'Teléfonos'}>Teléfonos</MenuItem>
              <MenuItem value={'Computadoras'}>Computadoras</MenuItem>
              <MenuItem value={'Periféricos'}>Periféricos</MenuItem>
              <MenuItem value={'Redes'}>Redes</MenuItem>
            </Select>
          </FormControl>

        </Stack>
      </Dialog>

    </Toolbar>
  );
}



const InventarioComp = () => {
  const [datos, setDatos] = React.useState([]);
  React.useEffect(() => {
    if (!localStorage.getItem('inventario')) {
      localStorage.setItem('inventario', JSON.stringify(rows))
      setDatos(rows);
    } else {
      const datosnuevos = [...JSON.parse(localStorage.getItem('inventario')), createData(99, 'Muñeco gallardo', 'Muñecos', 1, 1)]

      setDatos(datosnuevos)

    }
  }, [])

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('ID');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [visibleRows, setVisibleRows] = React.useState([]);

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
  const agregarProducto = () => {


  }


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datos.length) : 0;


  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar />
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
                {visibleRows && visibleRows.length > 0 ? visibleRows.map((row, index) => {

                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover

                      tabIndex={-1}
                      key={row.id}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell >
                        <Stack direction="row" justifyContent="space-between">
                          <DeleteIcon sx={{ color: "#F45C5C" }} onClick={() => alert('borrado!')} />
                          <CreateIcon sx={{ color: "grey" }} onClick={() => alert('Editado!')} />

                        </Stack>

                      </TableCell>
                      <TableCell
                        component="th"
                        align='right'
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.producto}
                      </TableCell>
                      <TableCell align="right">{row.cantidad}</TableCell>
                      <TableCell align="right">{row.precioVenta}</TableCell>
                      <TableCell align="right">{row.categoria}</TableCell>
                      <TableCell align="right">{row.id}</TableCell>
                    </TableRow>
                  );
                }) :

                  <h1>cargando...</h1>}
                {datos.length > 0 && emptyRows > 0 && (
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
            datos.length > 0 &&
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
    </>
  );
}
export default InventarioComp