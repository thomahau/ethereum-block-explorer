import Head from 'next/head';

import '../styles/globals.css';
import '../styles/css-loader.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Ethereum Block Explorer</title>
        <meta name="description" content="Ethereum block explorer" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
