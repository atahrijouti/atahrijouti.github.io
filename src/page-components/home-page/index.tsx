import { Fractal } from "./components/fractal"
import { homePage } from "./home-page.css"
import { useCallback, useEffect } from "react"
import { useRouter } from "next/router"

export const HomePage = () => {
  const router = useRouter()

  const handleDblclick = useCallback(() => {
    router.push("/hello")
  }, [router])
  useEffect(() => {
    window.addEventListener("dblclick", handleDblclick)
    return () => {
      window.removeEventListener("dblclick", handleDblclick)
    }
  }, [handleDblclick])
  return (
    <div className={`page ${homePage}`}>
      <Fractal />
    </div>
  )
}
