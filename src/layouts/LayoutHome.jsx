import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Container, Dialog, IconButton, Stack, Toolbar } from '@mui/material';
import CambiarRolComp from '../components/btnCambiarRol/CambiarRolComp';
import CloseIcon from '@mui/icons-material/Close';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}


function LayoutHome() {
    const location = useLocation();

    const pathToIndex = (path) => {
        switch (path) {
            case '/':
                return 1;
            case '/vender':
                return 2;
            case '/estadisticas':
                return 3;
            case '/actividad':
                return 4;
            default:
                return 1;
        }
    };

    const [value, setValue] = React.useState(pathToIndex(location.pathname));
  
    const navigate = useNavigate();
    React.useEffect(()=>{
        let openRequest = indexedDB.open("inventario", 1);
        openRequest.onupgradeneeded = function(event) {
            let db = event.target.result;
                if (!db.objectStoreNames.contains("productos")) {
                let objectStore = db.createObjectStore("productos", { keyPath: "id", autoIncrement: true });
                objectStore.createIndex("nombre", "nombre", { unique: false });
                objectStore.createIndex("cantidad", "cantidad", { unique: false });
                objectStore.createIndex("categoria", "categoria", { unique: false });
                objectStore.createIndex("precioVenta", "precioVenta", { unique: false });
                objectStore.createIndex("precioCompra", "precioCompra", { unique: false });

                let requestAdd = objectStore.add({ nombre: "primero", cantidad: 25, categoria: 1, precioVenta: 2900, precioCompra: 2000 });
                requestAdd.onsuccess = function(event) {
                    console.log("Datos añadidos con ID:", event.target.result);
                };
            
                requestAdd.onerror = function(event) {
                    console.log("Error al añadir datos:", event.target.errorCode);
                };
            }
        };
        
        openRequest.onsuccess = function(event) {
            let db = event.target.result;
            console.log('db abierta', db)
        
       
        };
        
        openRequest.onerror = function(event) {
            console.log("Error al abrir la base de datos:", event.target.errorCode);
        };
        
    },[])

    React.useEffect(() => {
        switch (value) {
            case 1: navigate('/')
                break;
                case 2: navigate('/vender')
                break;
                case 3: navigate('/estadisticas')
                break;
                case 4: navigate('/actividad')
                break;
            
            default: break;

        }
    }, [navigate, value])
    const handleChange = (event, newValue) => {
        switch (newValue) {
            case 1: navigate('/')
                break;
                case 2: navigate('/vender')
                break;
                case 3: navigate('/estadisticas')
                break;
                case 4: navigate('/actividad')
                break;
            
            default: break;

        }
        setValue(newValue);
    };


    return (
        <>
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100vh', width: "100vw" }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}

                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{
                    borderRight: 1,
                    borderColor: 'divider',
                    height: "100vh",
                    width: "300px",
                    maxWidth: "300px"
                }}
            >
                <Stack justifyContent="center" alignItems={'center'} py={2} width="300px">
                    <img src='/erp.svg' width="90px"></img>
                </Stack>

                <Tab label="Inventario" {...a11yProps(0)} />
                <Tab label="Vender" {...a11yProps(1)} />
                <Tab label="Estadisticas" {...a11yProps(2)} />
                <Tab label="Actividad" {...a11yProps(3)} />


            </Tabs>
            <Stack value={value} style={{ width: "calc(100vw - 300px)", padding: 0 }} index={value}>
                <CambiarRolComp />
                <Container fluid>
                    <Outlet />
                </Container>
            </Stack>

        </Box>
    
        </>

    );
}
export default LayoutHome;