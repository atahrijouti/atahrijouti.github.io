import React, { useEffect, useMemo, useState } from "react"

import _random from "lodash/random"
import _shuffle from "lodash/shuffle"
import classNames from "classnames"

import { coefficientVar, leaf, leafInner, leftLeaf, rightLeaf } from "./leaf.css"
import { assignInlineVars } from "@vanilla-extract/dynamic"
import { fullLeafVar, growingLeafVar, leafBackgroundVar } from "./fractal.css"

const MAX_LEVEL = 5

type LeafProps = {
  orientation?: "left" | "right"
  level?: number
}

// eslint-disable-next-line react/display-name
export const Leaf = React.memo(({ orientation, level = 0 }: LeafProps) => {
  const [children, setChildren] = useState<LeafProps["orientation"][]>([])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const levelCoefficient = useMemo(() => Math.pow(0.87, level), [])

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
      const fireTime = _random(333, 555)
      const [first, second] = _shuffle(["left", "right"]) as LeafProps["orientation"][]
      timeouts = [
        setTimeout(() => {
          setChildren([first])
        }, fireTime),
        setTimeout(() => {
          setChildren([first, second])
        }, _random(fireTime, 777)),
      ]
    }

    return () => {
      timeouts.forEach((t) => clearTimeout(t))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={classNames(
        leaf,
        orientation ? (orientation === "right" ? rightLeaf : leftLeaf) : "",
      )}
      id={id}
      style={assignInlineVars({
        [coefficientVar]: levelCoefficient.toString(),
        [leafBackgroundVar]: children.length < 2 ? growingLeafVar : fullLeafVar,
      })}
    >
      <div className={leafInner}>
        {children.map((o) => (
          <Leaf key={o} orientation={o} level={level + 1} />
        ))}
      </div>
    </div>
  )
})
