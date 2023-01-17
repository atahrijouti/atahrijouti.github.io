import { useRouter } from "next/router"
import { useCallback, useEffect } from "react"

const Hello = () => {
  const router = useRouter()

  const handleDblclick = useCallback(() => {
    router.push("/")
  }, [router])
  useEffect(() => {
    window.addEventListener("dblclick", handleDblclick)
    return () => {
      window.removeEventListener("dblclick", handleDblclick)
    }
  }, [handleDblclick])

  return <p>Hello sneaky visitor</p>
}

export default Hello
