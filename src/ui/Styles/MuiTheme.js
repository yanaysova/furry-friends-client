import { createTheme } from "@mui/material/styles";

const MuiTheme = createTheme({
  palette: {
    primary: {
      main: "#FFAA78",
    },
    secondary: {
      main: "#80D08C",
    },
    text: {
      primary: "#002800",
      secondary: "#DFE0DF",
    },
    background: {
      default: "#ffff",
    },
    error: {
      main: "#C35355",
    },
  },
});

export default MuiTheme;
