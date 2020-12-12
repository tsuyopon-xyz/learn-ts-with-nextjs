// https://nextjs.org/docs/basic-features/typescript#custom-app
import type { AppProps /*, AppContext */ } from 'next/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
