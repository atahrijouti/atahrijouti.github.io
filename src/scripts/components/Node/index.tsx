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
const SPROUT_SCALE = 0.707
const SPROUT_SPEED_LIMIT = 750
const MAX_SPROUT_LEVELS = 8
const SPROUTING_CHANCE = 60 / 100

export const Node = ({
  level,
  id,
  maxChildren,
  scale,
}: {
  level: number
  id: string
  maxChildren: number
  scale: number
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
      const newId = `${id}-${childNodes.length + 1}`
      const newLevel = level + 1
      const newScale = scale * SPROUT_SCALE
      const newChildren = [
        ...childNodes,
        <Node
          key={newId}
          id={newId}
          level={newLevel}
          maxChildren={maxChildren}
          scale={newScale}
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
    scale,
  ])

  return (
    <div
      className={cx("Node", {
        "Node--even-level": isEvenLevel,
        "Node--full": isFull,
      })}
      id={id}
      style={
        {
          "--scale": scale,
        } as CSSProperties
      }
    >
      <div className="Node--inner">{childNodes}</div>
    </div>
  )
}
