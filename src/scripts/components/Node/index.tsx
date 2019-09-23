import React, {
  useContext,
  useState,
  useEffect,
  ReactNode,
  CSSProperties,
} from "react"
import cx from "classnames"

import { LevelsContext } from "../App"
import "./Node.css"

export const MAX_LEAVES_PER_NODE = 2
const SPROUT_SPEED_LIMIT = 250
const MAX_SPROUT_LEVELS = 4
const SPROUTING_CHANCE = 35 / 100

export const Node = ({
  level,
  id,
  maxChildren,
  isFirst = false,
  isSecond = false,
}: {
  level: number
  id: string
  maxChildren: number
  isFirst?: boolean
  isSecond?: boolean
}) => {
  const { levelReached, updateLevelReached } = useContext(LevelsContext)
  const [childNodes, setChildNodes] = useState<ReactNode[]>([])
  const reachedSproutingLimit = level >= MAX_SPROUT_LEVELS

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
      : Math.random() > SPROUTING_CHANCE
      ? 1
      : MAX_LEAVES_PER_NODE
    const speed = Math.random() * SPROUT_SPEED_LIMIT
    const timeTillNextUpdate =
      speed + speed * Math.random() * levelReached * level

    const timeout = setTimeout(() => {
      const position = childNodes.length
      const newId = `${id}-${position + 1}`
      const newLevel = level + 1
      const newChildren = [
        ...childNodes,
        <Node
          key={newId}
          id={newId}
          level={newLevel}
          maxChildren={maxChildren}
          isFirst={position === 0}
          isSecond={position === 1}
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
        "Node--first": isFirst,
        "Node--second": isSecond,
      })}
      id={id}
      style={{} as CSSProperties}
    >
      {childNodes}
    </div>
  )
}
