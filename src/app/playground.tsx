import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Playground",
  description: "A sandbox to play with the toys I have made, this is my playground and yours",
}

export default () => {
  return (
    <div>
      <h1>Playground</h1>
      <p>This is a place where I showcase all my playthings</p>
    </div>
  )
}
