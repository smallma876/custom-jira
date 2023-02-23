import { AppProps } from "next/app";
import React from "react";
import { UIProvider } from "../context/ui";
import { lightTheme, darkTheme } from "../themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { EntriesProvider } from "../context/entries";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <EntriesProvider>
      <UIProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </EntriesProvider>
  );
};

export default MyApp;
