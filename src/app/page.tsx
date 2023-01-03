"use client"

import { useEffect } from "react"

import { runOldJSCode } from "app/script"
import { Node } from "./Node"
import { AppStyles } from "./styles"
import styled from "styled-components"

const Canvas = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
`
const Page = () => {
  useEffect(() => {
    runOldJSCode()
  })

  return (
    <>
      <AppStyles />
      <Canvas>
        <div id="base" className="base">
          <Node />
        </div>
      </Canvas>
    </>
  )
}

export default Page
