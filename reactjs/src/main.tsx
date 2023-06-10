import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from "./App.tsx";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
