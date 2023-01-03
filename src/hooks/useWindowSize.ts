import { useLayoutEffect, useState } from "react"

function useWindowSize() {
  const [size, setSize] = useState([0, 0])
  useLayoutEffect(() => {
    function handleEvent() {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener("resize", handleEvent)
    handleEvent()
    return () => window.removeEventListener("resize", handleEvent)
  }, [])
  return size
}
