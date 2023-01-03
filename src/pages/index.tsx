import { CSSProperties, useEffect, useMemo, useState } from "react"
import classNames from "classnames"
import _random from "lodash/random"

import { runOldJSCode } from "scripts/script"

const MAX_LEVEL = 6

type NodeProps = {
  orientation?: "left" | "right"
  level?: number
}

const Node = ({ orientation, level = 0 }: NodeProps) => {
  const [children, setChildren] = useState<NodeProps["orientation"][]>([])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const levelCoefficient = useMemo(() => Math.pow(0.8, level), [])
  const id = useMemo(() => {
    if (level === 0) {
      return "root-node"
    } else {
      return `Node-${level}-${orientation == "left" ? 0 : 1}`
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    // console.log(`#${id} Effect : Mounted`)
    if (level < MAX_LEVEL) {
      const fireTime = _random(333, 666)
      setTimeout(() => {
        // console.log(`#${id} setState : Right`)
        setChildren(["right"])
      }, fireTime)
      setTimeout(() => {
        // console.log(`#${id} setState : Left`)
        setChildren(["left", "right"])
      }, _random(fireTime, 999))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // console.log(`#${id} Rendered`)
  return (
    <div
      id={id}
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
        <Node />
      </div>
    </div>
  )
}
