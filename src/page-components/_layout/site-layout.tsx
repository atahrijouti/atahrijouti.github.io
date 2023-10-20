import { PropsWithChildren } from "react"
import Link from "next/link"

import {
  constructionNotice,
  layout,
  main,
  menu,
  nav,
} from "@/page-components/_layout/site-layout.css"

type Props = {}
export const SiteLayout = ({ children }: PropsWithChildren<Props>) => {
  return (
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
  )
}
