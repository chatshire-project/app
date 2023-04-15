import Head from 'next/head';
import { Default } from '@layouts';
import AmplitudeHomePage from '@services/amplitude';
import { Icon } from '@common';

export default function HomePage() {
  AmplitudeHomePage();

  return (
    <>
      <Head>
        <title>Chatshire</title>
        <meta
          name="description"
          content="Unlock the Magic of AI for Seamless Crypto Data Analysis"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:image" content="/preview.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Default>
        <></>
      </Default>
    </>
  );
}
