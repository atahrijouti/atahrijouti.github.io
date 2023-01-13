import { Fractal } from "./components/fractal"
import { homePage } from "./home-page.css"

export const HomePage = () => {
  return (
    <div className={`page ${homePage}`}>
      <Fractal />
    </div>
  )
}
