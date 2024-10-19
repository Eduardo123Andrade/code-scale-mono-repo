import { it, expect } from "vitest"
import { render } from "@testing-library/react"
import App from "./App"

it("renders correctly", () => {
  const { asFragment } = render(<App />)

  expect(asFragment()).toMatchSnapshot()
})
