import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Stack, Typography } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import "./index.css"

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

 const CambiarRolComp=()=> {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [rolIndex, setRolIndex] = React.useState(0);
  const rol = [
    'admin',
    'deposito',
    'ventas'
  ]
  const rolIcon = [
    <AdminPanelSettingsIcon/>,
    <LocalShippingIcon/>,
    <CreditScoreIcon/>,
  ]
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (index) => {
    localStorage.setItem('rol',rol[index])
    setRolIndex(index)
    setAnchorEl(null);
  };

  return (
    <Stack direction="row" justifyContent={"flex-end"} alignItems={'center'} my={2} mr={2} width={"calc(100vw-300px)"} >
      <Typography fontWeight={800} mr={1}>Rol: </Typography>
      <Button
      color="cuaternary"
      
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        sx={{fontWeight: "bold"}}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {rolIcon[rolIndex]}
        {rol[rolIndex]}
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        
        anchorEl={anchorEl}
        open={open}
        onClose={()=>handleClose(rolIndex)}
      >
        {rol.map((e,index)=>{
         return <MenuItem  onClick={()=>handleClose(index)} disableRipple>
         {rolIcon[index]}
           {e.toUpperCase()}
         </MenuItem> 
        })}
       
      </StyledMenu>
    </Stack >
  );
}
export default CambiarRolComp