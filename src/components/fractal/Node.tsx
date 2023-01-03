import React, { CSSProperties, useEffect, useMemo, useState } from "react"
import _random from "lodash/random"
import classNames from "classnames"

import "./Node.css"

const MAX_LEVEL = 6

type NodeProps = {
  orientation?: "left" | "right"
  level?: number
}

// eslint-disable-next-line react/display-name
export const Node = React.memo(({ orientation, level = 0 }: NodeProps) => {
  const [children, setChildren] = useState<NodeProps["orientation"][]>([])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const levelCoefficient = useMemo(() => Math.pow(0.8, level), [])

  const id = useMemo(() => {
    if (level === 0) {
      return "root-node"
    } else {
      return `Node-${level}-${orientation == "right" ? 0 : 1}`
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = []
    if (level < MAX_LEVEL) {
      const fireTime = _random(1111, 2222)
      timeouts = [
        setTimeout(() => {
          setChildren(["right"])
        }, fireTime),
        setTimeout(() => {
          setChildren(["left", "right"])
        }, _random(fireTime, 3333)),
      ]
    }
    return () => {
      timeouts.forEach((t) => clearTimeout(t))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(`Rendered : ${id} - ${children.length}`)

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
        {children.length >= 1 && <Node orientation="right" level={level + 1} />}
        {children.length >= 2 && <Node orientation="left" level={level + 1} />}
      </div>
    </div>
  )
})
