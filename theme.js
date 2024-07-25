import createTheme from "@mui/material/styles/createTheme"
import { Colors } from "./src/utils/Colors.jsx"

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary.main,
      contrastText: Colors.primary.contrastText,
    },
    secondary: {
      main: Colors.secondary.main,
      contrastText: Colors.secondary.contrastText,
    },
    terciary: {
      main: Colors.terciary.main,
      contrastText: Colors.terciary.contrastText,
    },
    cuaternary: {
      main: Colors.cuaternary.main,
      contrastText: Colors.cuaternary.contrastText,
    },
    quintary: {
        main: Colors.quintary.main,
        contrastText: Colors.quintary.contrastText,

    },
    sixtary: {
        main: Colors.sixtary.main,
        contrastText: Colors.sixtary.contrastText,

    },
    badgeColor: {
      main: "#FF0000",
    },
    textDisable: {
      main: "#32415B",
    },
  },
  
})

export default theme