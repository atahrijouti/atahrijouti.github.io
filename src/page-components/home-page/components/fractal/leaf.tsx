import React, { CSSProperties, useEffect, useMemo, useState } from "react"
import _random from "lodash/random"
import _shuffle from "lodash/shuffle"
import classNames from "classnames"

import styles from "./leaf.module.css"

const MAX_LEVEL = 5

type LeafProps = {
  orientation?: "left" | "right"
  level?: number
}

// eslint-disable-next-line react/display-name
export const Leaf = React.memo(({ orientation, level = 0 }: LeafProps) => {
  const [children, setChildren] = useState<LeafProps["orientation"][]>([])

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
      const fireTime = _random(1333, 2666)
      const [first, second] = _shuffle(["left", "right"]) as LeafProps["orientation"][]
      timeouts = [
        setTimeout(() => {
          setChildren([first])
        }, fireTime),
        setTimeout(() => {
          setChildren([first, second])
        }, _random(fireTime, 3999)),
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
        styles.Leaf,
        orientation ? (orientation === "right" ? styles.RightLeaf : styles.LeftLeaf) : "",
      )}
      id={id}
      style={
        {
          "--coefficient": levelCoefficient,
          "--leaf-background":
            children.length < 2 ? "var(--growing-leaf-color)" : "var(--leaf-full)",
        } as CSSProperties
      }
    >
      <div className={styles.LeafInner}>
        {children.map((o) => (
          <Leaf key={o} orientation={o} level={level + 1} />
        ))}
      </div>
    </div>
  )
})
