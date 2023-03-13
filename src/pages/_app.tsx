import { useEffect } from "react"
import type { AppProps } from "next/app"
import Head from "next/head"

import "../app.css"
import { useRouter } from "next/router"
import { pageViewedEvent } from "../meta/tracking"

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    router.events.on("routeChangeComplete", pageViewedEvent)
    return () => {
      router.events.off("routeChangeComplete", pageViewedEvent)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <title>Abderrahmane TAHRI JOUTI</title>
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
