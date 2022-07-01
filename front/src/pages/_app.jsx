import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Layout, Composer } from '~components';
import {
  SsjContextProvider,
  UserContextProvider,
  GOContextProvider,
} from '~contexts';
import { GA, GTM, trackGA } from '~services';
import '~/styles/index.sass';

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    GA.init();
    GTM.init();
    trackGA();
  }, []);

  return (
    <>
      <Head>
        <title>BuyaCar: the easy way to get a great car deal</title>
      </Head>
      <Composer
        components={[
          UserContextProvider,
          GOContextProvider,
          SsjContextProvider,
        ]}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Composer>
    </>
  );
};

App.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App;
