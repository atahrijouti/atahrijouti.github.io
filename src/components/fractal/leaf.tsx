import React, { CSSProperties, useEffect, useMemo, useState } from "react"
import _random from "lodash/random"
import styled from "styled-components"

const MAX_LEVEL = 4

const LeafInner = styled.div`
  position: relative;
  width: var(--base-width);
  height: var(--base-height);
`

const LeafElement = styled.div`
  width: var(--base-width);
  height: var(--base-height);
  background-color: rgba(var(--leaf-background), var(--coefficient));
  transition: background 1s, transform 100ms;
  ${LeafInner} & {
    position: absolute;
  }
`
const RightLeaf = styled(LeafElement)`
  right: 0;
  top: -100%;
  transform-origin: bottom right;
  transform: scale(var(--right-scale)) rotate(var(--right-rotation));
`

const LeftLeaf = styled(LeafElement)`
  top: -100%;
  left: 0;
  transform-origin: bottom left;
  transform: scale(var(--left-scale)) rotate(var(--left-rotation));
`

type LeafProps = {
  orientation?: "left" | "right"
  level?: number
}

// eslint-disable-next-line react/display-name
export const Leaf = React.memo(({ orientation, level = 0 }: LeafProps) => {
  const [children, setChildren] = useState<LeafProps["orientation"][]>([])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const levelCoefficient = useMemo(() => Math.pow(0.8, level), [])
  const StyledElement = useMemo(() => {
    switch (orientation) {
      case "left":
        return LeftLeaf
      case "right":
        return RightLeaf
      default:
        return LeafElement
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  return (
    <StyledElement
      id={id}
      style={
        {
          "--coefficient": levelCoefficient,
          "--leaf-background":
            children.length < 2 ? "var(--growing-leaf-color)" : "var(--leaf-full)",
        } as CSSProperties
      }
    >
      <LeafInner>
        {children.length >= 1 && <Leaf orientation="right" level={level + 1} />}
        {children.length >= 2 && <Leaf orientation="left" level={level + 1} />}
      </LeafInner>
    </StyledElement>
  )
})
