import { useEffect } from "react"
import type { AppProps } from "next/app"
import Script from "next/script"
import Head from "next/head"

import "../app.css"
import { useRouter } from "next/router"
import { matomoInlineScript, tellMatomoAboutPageChange } from "../meta/tracking"

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    router.events.on("routeChangeComplete", tellMatomoAboutPageChange)
    return () => {
      router.events.off("routeChangeComplete", tellMatomoAboutPageChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <title>Abderrahmane TAHRI JOUTI</title>
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
      </Head>
      <Script
        id="matomo"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: matomoInlineScript }}
      />
      <Component {...pageProps} />
    </>
  )
}
