import React, { useContext, useState, useEffect } from "react"
import cx from "classnames"
import uuid from "uuid"

import { LevelsContext } from "../App"
import "./Node.css"

function useChildNodesBuilder({
  id,
  childNodes,
  maxChildren,
  level,
  updateChildNodes,
  reachedLevel,
  full,
  setFull
}) {
  useEffect(
    () => {
      if (childNodes.length >= maxChildren) {
        if (childNodes.length === 2 && !full) {
          setFull(true)
        }
        return
      }
      const speed = Math.random() * 1000
      const timeTillNextUpdate =
        speed + speed * Math.random() * reachedLevel * level

      const timeout = setTimeout(() => {
        const newId = uuid()
        const newChildren = [
          ...childNodes,
          <Node
            key={newId}
            id={newId}
            level={level + 1}
            maxChildren={Math.random() > 0.8 ? 1 : 2}
          />
        ]
        updateChildNodes(newChildren)
      }, timeTillNextUpdate)

      return () => {
        clearTimeout(timeout)
      }
    },
    [childNodes.length]
  )
}

function useReachedLevelUpdater({ updateReachedLevel, level }) {
  useEffect(
    () => {
      updateReachedLevel(level)
    },
    [true]
  )
}

export function Node({ level, base, id, maxChildren }) {
  if (level > 5) return <div className="Node" />

  const { reachedLevel, updateReachedLevel } = useContext(LevelsContext)
  const [childNodes, updateChildNodes] = useState([])
  const [full, setFull] = useState(false)

  useChildNodesBuilder({
    id,
    childNodes,
    maxChildren,
    level,
    updateChildNodes,
    reachedLevel,
    full,
    setFull
  })
  useReachedLevelUpdater({ updateReachedLevel, level })

  return (
    <div
      className={cx("Node", {
        base,
        "Node--even-level": level % 2 === 0,
        "Node--full": full
      })}>
      {childNodes}
    </div>
  )
}
