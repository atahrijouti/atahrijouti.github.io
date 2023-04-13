import { Fractal } from "./components/fractal"
import { useCallback, useEffect } from "react"
import { useRouter } from "next/router"

export const HomePage = () => {
  const router = useRouter()

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
    <div>
      <Fractal />
    </div>
  )
}
