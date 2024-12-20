import Link from "next/link"
import { Metadata, Viewport } from "next"

import "@picocss/pico/css/pico.fluid.classless.min.css"

import "./global.css"

import { bodyStyle, layout, main, menu, nav, rootStyle } from "./layout.css"

export const metadata: Metadata = {
  title: "Abderrahmane TAHRI JOUTI",
  description:
    "Product oriented Technical professional with a strong background in building web applications.",
  manifest: "/manifest.webmanifest",
}

export const viewport: Viewport = {
  themeColor: "#EF3C46",
  colorScheme: "light dark",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "f262040c05ca4158a7cd6be56b3f1028"}'
        ></script>
      </head>
      <body className={bodyStyle}>
        <div className={rootStyle}>
          <div className={layout}>
            <aside>
              <nav className={nav}>
                <ul className={menu}>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/playground">Playground</Link>
                  </li>
                  <li>
                    <Link href="/resume">Resumé</Link>
                  </li>
                </ul>
              </nav>
            </aside>
            <main className={main}>{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
