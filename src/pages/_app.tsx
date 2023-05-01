import { useEffect } from "react"
import type { AppProps } from "next/app"
import Head from "next/head"
import { useRouter } from "next/router"

import "@picocss/pico/css/pico.slim.min.css"

import { SiteLayout } from "@/page-components/_layout/site-layout"
import { pageViewedEvent } from "@/meta/tracking"

import "../app.css"

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
        <meta
          name="description"
          content="Product oriented Technical professional with a strong background in building web applications."
        />
      </Head>
      <SiteLayout>
        <Component {...pageProps} />
      </SiteLayout>
    </>
  )
}
