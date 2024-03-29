import { Fractal } from "./components/fractal"
import { useCallback, useEffect } from "react"
import { canvasOuter, homePage } from "@/page-components/home-page/home-page.css"

export const HomePage = () => {
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
