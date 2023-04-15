import '@styles/reset.css';
import '@styles/globals.css';
import amplitude from 'amplitude-js';
import { Gnb } from '@common';
import { AMPLITUDE_KEY } from '@constants/config';
import type { AppProps } from 'next/app';

amplitude.getInstance().init(String(AMPLITUDE_KEY));

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Gnb></Gnb>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
