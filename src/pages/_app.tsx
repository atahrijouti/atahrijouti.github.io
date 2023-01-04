import type { AppProps } from "next/app"

import Head from "next/head"

import "./styles"
import GlobalStyles from "./styles"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Abderrahmane TAHRI JOUTI</title>
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}
