
import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../config/theme';
import createEmotionCache from '../config/createEmotionCache';
import '@/styles/globals.css'
import { ContextProvider } from "@/lib/SocketContext";

// Client-side cache shared for the whole session 
// of the user in the browser.

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache =
    clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ContextProvider>
        <Head>
          <meta name="viewport"
            content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>

          {/* CssBaseline kickstart an elegant,
                        consistent, and simple baseline to
                        build upon. */}

          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ContextProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};