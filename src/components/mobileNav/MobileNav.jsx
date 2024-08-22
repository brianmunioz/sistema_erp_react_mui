import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Colors } from '../../utils/Colors';
import { Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
const MobileNav = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = ['inventario', 'ventas', "categorias",'estadisticas'];

  return (
    <>
      <AppBar sx={{background: Colors.cuaternary.main}} position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            color="primary"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
          </Typography>
          <Box
            component="img"
            sx={{ width: 40, height: 40,  }}
            src="/logo.png"
            alt="erp"
          />
        </Toolbar>
      </AppBar>
      
      <Drawer
        anchor="left"
        open={drawerOpen}

        onClose={toggleDrawer(false)}
        sx={{ '& .MuiDrawer-paper': { width: '100%', background: Colors.cuaternary.main} }}
      >
        <List sx={{ padding: 2 }}>
        <Stack alignItems={'flex-end'} key={'equis'}  sx={{cursor: "pointer", width: "100%"}} onClick={toggleDrawer(false)}>
            <CloseIcon/>
            </Stack>     
          {menuItems.map((text, index) => (
            <ListItem button key={index} onClick={()=>{

                if(index == 0 ){
                    navigate('/productos/')
                }else if(index == 1){
                    navigate('/productos/vender')
                }else if(index==2){
                    navigate('/productos/categorias')
                }else {
                  navigate('/productos/estadisticas')
              }
                
                setDrawerOpen(false)

                }}>
              <ListItemText primary={text}   sx={{fontWeight: 800, color: Colors.primary.main, textTransform: 'uppercase', 
                textAlign: "center"
              }} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default MobileNav;
