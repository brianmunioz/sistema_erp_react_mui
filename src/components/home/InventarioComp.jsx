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

import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { visuallyHidden } from '@mui/utils';
import { Colors } from '../../utils/Colors';
import { AppBar,List, Button, Dialog, Divider, IconButton, ListItemButton, ListItemText, Slide, Stack, Input, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function createData(id, producto, categoria, precioVenta, cantidad) {
  return {
    id,
    producto,
    categoria,
    precioVenta,
    cantidad
  };
}

const rows = [
  createData(1, 'Muñeco Darth Vader', 'Muñecos', 200, 67),
  createData(2, 'Nave Star Wars', 'Naves', 300, 51),
  createData(3, 'Vegeta SSJ2', 'Muñecos', 25.6, 24),
  createData(4, 'Ajedrez', 'Juegos de mesa', 29, 5),
  createData(5, '100 cartas de yu gi oh', 'Cartas', 75, 49),
  createData(6, 'Casco Darth Vader', "Mascaras", 900, 3),
  createData(7, 'Pistola de agua', 'Juegos de verano', 9, 37),
  createData(8, 'Goku ssj4', 'Muñecos', 390, 20),
  createData(9, 'Microfono', 'Musical', 26.9, 65),
  createData(10, 'Pelota de basketball', 'Deportes', 98, 28),
  createData(11, 'Pelota de futbol', 'Deportes', 20, 81),
  createData(12, 'Arco de futbol', 'Deportes', 19.1, 9),
  createData(13, 'Piano', 'Musical', 18.23, 10),
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
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
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
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
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
    // Almacenar el api en una variable

    // Crear la variable que almacenará la instancia de la base de datos
    let db;

    // Crear la conexión a la base de datos e indicar la versión
    const conexiondb = indexedDB.open('inventario', 1);

    // Evento que se dispara cuando la base de datos se abre
    conexiondb.onsuccess = () => {
        db = conexiondb.result;
        console.log('Base de datos abierta', db);

        // Crear una transacción y obtener el almacén de objetos
        const transaccion = db.transaction(['productos'], 'readwrite');
        const coleccionObjetos = transaccion.objectStore('productos');

        // Ejecutar el método deseado sobre la colección
        const conexion = coleccionObjetos.add({
            nombre: "agregado",
            cantidad: 99,
            categoriaId: 2,
            precioVenta: 900,
            precioCompra: 600
        });

        conexion.onsuccess = () => {
            console.log("Nuevo producto agregado");
        };

        conexion.onerror = (event) => {
            console.log("Error al agregar el producto:", event.target.error);
        };
    };

    conexiondb.onerror = (event) => {
        console.log("Error al abrir la base de datos:", event.target.errorCode);
    };

    conexiondb.onupgradeneeded = (event) => {
        db = event.target.result;
        if (!db.objectStoreNames.contains('productos')) {
            db.createObjectStore('productos', { keyPath: 'id', autoIncrement: true });
        }
    };
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
            <Button autoFocus color="inherit" onClick={handleClose}>
              Guardar
            </Button>
          </Toolbar>
        </AppBar>
        <Stack direction={'column'} justifyContent="space-between" alignItems={'center'} p={5}>
        <TextField sx={{marginBottom: 2}} fullWidth label="Nombre del producto"  />   
        <TextField sx={{marginBottom: 2}} fullWidth label="Precio de compra"  />
        <TextField sx={{marginBottom: 2}} fullWidth label="Precio de venta"  />
        <TextField type='number'sx={{marginBottom: 2}} fullWidth label="Cantidad"  />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120, width: "100%" }}>
        <InputLabel id="demo-simple-select-standard-label">Categoria</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
        
          label="Categoria"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Muñecos</MenuItem>
          <MenuItem value={20}>Naves</MenuItem>
          <MenuItem value={30}>Deportes</MenuItem>
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
      localStorage.setItem('inventario', JSON.stringify(datosnuevos))

      setDatos(datosnuevos)

    }
  }, [])
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = datos.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datos.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(datos, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );
  console.log(datos)
  return (
    <>
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={datos.length}
            />
            <TableBody>
              {datos.length > 0 && visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
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
              })}
              {datos.length > 0 && emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
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