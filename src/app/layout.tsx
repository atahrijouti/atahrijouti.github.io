import Link from "next/link"
import { Metadata } from "next"

import "@picocss/pico/css/pico.slim.min.css"

import "./global.css"

import { bodyStyle, constructionNotice, layout, main, menu, nav, rootStyle } from "./layout.css"

export const metadata: Metadata = {
  title: "Abderrahmane TAHRI JOUTI",
  description:
    "Product oriented Technical professional with a strong background in building web applications.",
  viewport: "width=device-width,initial-scale=1,shrink-to-fit=no",
  themeColor: "#EF3C46",
  colorScheme: "light dark",
  manifest: "/manifest.webmanifest",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={bodyStyle}>
        <div className={rootStyle}>
          <div className={layout}>
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
            <main className={main}>{children}</main>
            <aside className={constructionNotice}>
              <p>
                <span>🏗️ Under heavy construction 🏗️</span> <span>🚧 Please be careful 🚧</span>
              </p>
            </aside>
          </div>
        </div>
      </body>
    </html>
  )
}
