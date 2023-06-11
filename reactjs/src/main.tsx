import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from "./App.tsx";
import { green, grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: green[500],
    },
    background: {
      default: grey[200],
    },
  },
  components: {
    // select padding should be 0
    MuiSelect: {
      styleOverrides: {
        select: {
          padding: 10,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: 10,
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
