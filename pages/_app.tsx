// https://nextjs.org/docs/basic-features/typescript#custom-app
import { useEffect } from 'react';
import Head from 'next/head';
import type { AppProps /*, AppContext */ } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Theme from 'src/components/Theme';
import NavBar from 'src/components/layouts/NavBar';

// https://nextjs.org/docs/advanced-features/custom-app
function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      // JavaScript: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Optional_chaining
      // TypeScript: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={Theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <NavBar />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
