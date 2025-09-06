import React from 'react';
import { SeoDefault } from './SeoConfig';

function App({ Component, pageProps }) {
  return (
    <>
      <SeoDefault />
      <Component {...pageProps} />
    </>
  );
}

export default App;