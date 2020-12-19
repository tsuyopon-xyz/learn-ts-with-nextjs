// https://nextjs.org/docs/basic-features/typescript#custom-app
import type { AppProps /*, AppContext */ } from 'next/app';
import React from 'react';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from 'src/components/Theme';
import NavBar from 'src/components/layouts/NavBar';

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <NavBar />
        <Container maxWidth="lg">
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default MyApp;
