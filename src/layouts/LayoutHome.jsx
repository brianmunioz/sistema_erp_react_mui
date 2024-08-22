import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Container, Stack, useMediaQuery } from '@mui/material';
import MobileNav from '../components/mobileNav/MobileNav';

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
            case '/productos':
                return 1;
            case '/productos/vender':
                return 2;
            case '/productos/estadisticas':
                return 4;
            case '/productos/categorias':
                return 3
            default:
                return 1;
        }
    };

    const [value, setValue] = React.useState(pathToIndex(location.pathname));

    const navigate = useNavigate();
    const mobile = useMediaQuery("(max-width: 1100px)");

    React.useEffect(() => {
        switch (value) {
            case 1: navigate('/productos')
                break;
            case 2: navigate('/productos/vender')
                break;
            case 4: navigate('/productos/estadisticas')
                break;
            case 3: navigate('/productos/categorias')
                break;
            default: break;

        }
    }, [navigate, value])
    const handleChange = (event, newValue) => {
        switch (newValue) {
            case 1: navigate('/productos')
                break;
            case 2: navigate('/productos/vender')
                break;
            case 4: navigate('/productos/estadisticas')
                break;
            case 3: navigate('/productos/categorias')
                break;

            default: break;

        }
        setValue(newValue);
    };


    return (
        <>
            <Box
                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', flexDirection: mobile ? 'column' : 'row', height: '100vh', width: "100vw" }}
            >
                {mobile ?
                    <MobileNav />
                    :

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
                            <img src='/logo.png' width="200px"></img>
                        </Stack>

                        <Tab label="Inventario" {...a11yProps(0)} />
                        <Tab label="Vender" {...a11yProps(1)} />
                        <Tab label="Categorias" {...a11yProps(3)} />

                        <Tab label="Estadisticas" {...a11yProps(2)} />



                    </Tabs>

                }

                <Stack value={value} style={{ width: mobile ? '100vw' : "calc(100vw - 300px)", padding: 0, background: "#fff" }} index={value}>
                    <Container fluid>
                        <Outlet />
                    </Container>
                </Stack>

            </Box>

        </>

    );
}
export default LayoutHome;