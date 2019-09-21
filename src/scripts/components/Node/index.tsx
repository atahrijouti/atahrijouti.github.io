import React, { useContext, useState, useEffect, ReactNode } from "react"
import cx from "classnames"

import { LevelsContext } from "../App"
import "./Node.css"

export const MAX_LEAVES_PER_NODE = 2

export const Node = ({
  level,
  id,
  maxChildren,
}: {
  level: number
  id: string
  maxChildren: number
}) => {
  const { levelReached, updateLevelReached } = useContext(LevelsContext)
  const [childNodes, setChildNodes] = useState<ReactNode[]>([])
  const reachedSproutingLimit = level >= 7

  const hasMaxChildren = childNodes.length >= maxChildren
  const isFull = hasMaxChildren && maxChildren === MAX_LEAVES_PER_NODE
  const isEvenLevel = level % 2 === 0

  useEffect(() => {
    updateLevelReached(level)
  }, [level, updateLevelReached])

  useEffect(() => {
    if (hasMaxChildren) {
      return
    }

    const maxChildren = reachedSproutingLimit
      ? 0
      : Math.random() > 0.6
      ? 1
      : MAX_LEAVES_PER_NODE
    const speed = Math.random() * 50
    const timeTillNextUpdate =
      speed + speed * Math.random() * levelReached * level

    const timeout = setTimeout(() => {
      const newId = `${id}-${childNodes.length + 1}`
      const newChildren = [
        ...childNodes,
        <Node
          key={newId}
          id={newId}
          level={level + 1}
          maxChildren={maxChildren}
        />,
      ]
      setChildNodes(newChildren)
    }, timeTillNextUpdate)

    return () => {
      clearTimeout(timeout)
    }
  }, [
    childNodes,
    id,
    hasMaxChildren,
    level,
    levelReached,
    reachedSproutingLimit,
  ])

  return (
    <div
      className={cx("Node", {
        "Node--even-level": isEvenLevel,
        "Node--full": isFull,
      })}
      id={id}
    >
      {childNodes}
    </div>
  )
}
