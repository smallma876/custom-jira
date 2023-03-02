import { AppProps } from "next/app";
import React from "react";
import { UIProvider } from "../context/ui";
import { SnackbarProvider } from "notistack";
import { darkTheme } from "../themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { EntriesProvider } from "../context/entries";
import { useRouter } from "next/router";
import Loader from "../components/ui/loader/Loader";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SnackbarProvider maxSnack={3}>
      <UIProvider>
        <EntriesProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Loader>
              <Component {...pageProps} />
            </Loader>
          </ThemeProvider>
        </EntriesProvider>
      </UIProvider>
    </SnackbarProvider>
  );
};

export default MyApp;
