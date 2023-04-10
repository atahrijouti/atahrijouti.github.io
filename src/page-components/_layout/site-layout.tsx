import { PropsWithChildren, ReactNode } from "react"
import Link from "next/link"

type Props = {}
export const SiteLayout = ({ children }: PropsWithChildren<Props>) => {
  return (
    <>
      <nav>
        <p>🚧🏗️ Under heavy construction 🏗️🚧 Please be careful 🚧</p>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/playground">Playground</Link></li>
          <li><Link href="/resume">Resumé</Link></li>
        </ul>
      </nav>
      <main>{children}</main>
    </>
  )
}
