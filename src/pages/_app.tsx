import type { AppProps } from "next/app"
import Head from "next/head"

import "../styles/App.css"
import "../styles/Node.css"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
        <meta name="theme-color" content="#EF3C46" />
        <title>Abderrahmane TAHRI JOUTI</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
