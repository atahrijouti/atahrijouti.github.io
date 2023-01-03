"use client"

import { useEffect } from "react"

import "./App.css"

import { runOldJSCode } from "app/script"
import { Node } from "./Node"

const Page = () => {
  useEffect(() => {
    runOldJSCode()
  })

  return (
    <div className="App">
      <div id="base" className="base">
        <Node />
      </div>
    </div>
  )
}

export default Page
