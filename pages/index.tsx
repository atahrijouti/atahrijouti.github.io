import { CSSProperties, useEffect, useMemo, useState } from "react"
import classNames from "classnames"
import _random from "lodash/random"
import { runOldJSCode } from "../scripts/script"

type NodeProps = {
  orientation?: "left" | "right"
  level: number
}
const Node = ({ orientation, level }: NodeProps) => {
  const [children, setChildren] = useState<NodeProps["orientation"][]>([])
  const levelCoefficient = useMemo(() => Math.pow(0.8, level), [])
  useEffect(() => {
    if (level < 4) {
      const fireTime = _random(750, 1500)
      setTimeout(() => {
        setChildren(["right"])
      }, fireTime)
      setTimeout(() => {
        setChildren(["left", "right"])
      }, _random(fireTime, 3000))
    }
  }, [])
  return (
    <div
      style={{ "--coefficient": levelCoefficient } as CSSProperties}
      className={classNames(
        "Node",
        {
          "Node--left": orientation == "left",
          "Node--right": orientation == "right",
        },
        children.length < 2 ? "Node--growing" : "Node--full",
      )}
    >
      <div className="Node--inner">
        {children.map((orientation) => (
          <Node key={orientation} orientation={orientation} level={level + 1} />
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  useEffect(() => {
    runOldJSCode()
  })
  return (
    <div className="App">
      <div id="base" className="base">
        <Node level={0} />
      </div>
    </div>
  )
}
