import { AppProps } from "next/app";
import React from "react";
import { UIProvider } from "../context/ui";
import { SnackbarProvider } from "notistack";
import { lightTheme, darkTheme } from "../themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { EntriesProvider } from "../context/entries";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SnackbarProvider maxSnack={3}>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
  );
};

export default MyApp;
