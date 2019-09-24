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
const SPROUT_SPEED_LIMIT = 50
const MAX_SPROUT_LEVELS = 9
const SPROUTING_CHANCE = 65 / 100

export const Node = ({
  level,
  id,
  maxChildren,
  isRight = false,
  isLeft = false,
}: {
  level: number
  id: string
  maxChildren: number
  isRight?: boolean
  isLeft?: boolean
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

    const speed = Math.random() * SPROUT_SPEED_LIMIT
    const timeTillNextUpdate =
      speed + speed * Math.random() * levelReached * level

    const timeout = setTimeout(() => {
      const maxChildren = reachedSproutingLimit
        ? 0
        : Math.random() > SPROUTING_CHANCE
        ? 1
        : MAX_LEAVES_PER_NODE
      const hasSibling = childNodes.length > 0
      const existingSibling = hasSibling ? (childNodes[0] as any) : null
      const existingPosition = hasSibling
        ? existingSibling.props.isRight
          ? 0
          : 1
        : null
      const newPosition = hasSibling
        ? existingPosition === 1
          ? 0
          : 1
        : Math.round(Math.random())

      const newId = `${id}-${newPosition + 1}`
      const newLevel = level + 1
      const newChildren = [
        ...childNodes,
        <Node
          key={newId}
          id={newId}
          level={newLevel}
          maxChildren={maxChildren}
          isRight={newPosition === 0}
          isLeft={newPosition === 1}
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
        "Node--right": isRight,
        "Node--left": isLeft,
      })}
      id={id}
      style={{} as CSSProperties}
    >
      <div className="Node--inner">{childNodes}</div>
    </div>
  )
}
