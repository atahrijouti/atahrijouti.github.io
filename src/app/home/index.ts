import { HelloComponent } from "./component.js"

export const metadata = {
  title: "Home is home",
}

export const content = () => {
  return HelloComponent()
}
