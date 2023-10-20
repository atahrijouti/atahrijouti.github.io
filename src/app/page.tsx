"use client"

import { useCallback, useEffect } from "react"

import { Fractal } from "./home/components/fractal"

import { canvasOuter, homePage } from "./home/page.css"

export default () => {
  const handleDblclick = useCallback(() => {
    console.log("nothing happened, on purpose")
  }, [])
  useEffect(() => {
    window.addEventListener("dblclick", handleDblclick)
    return () => {
      window.removeEventListener("dblclick", handleDblclick)
    }
  }, [handleDblclick])
  return (
    <div className={homePage}>
      <div className={canvasOuter}>
        <Fractal />
      </div>
    </div>
  )
}
