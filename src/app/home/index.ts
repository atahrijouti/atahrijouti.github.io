import type { Metadata } from "../../types.js"
import { HelloComponent } from "./component.js"

export const metadata: Metadata = {
  title: "Abderrahmane TAHRI JOUTI",
  description:
    "Product oriented Technical professional with a strong background in building web applications.",
}

export const content = () => {
  return HelloComponent()
}
