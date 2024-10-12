import React from "react";
import App from "../App";
import { render } from "@testing-library/react";

// ignoring error logs due to state updates within test
jest.spyOn(console, "error").mockImplementation(() => {});

// hack - fetch not included in nonejs env by default
global.fetch = jest.fn(() => ({
  json: () => ({ rows: [], totalRows: 0 }),
})) as jest.Mock;

describe("App", () => {
  const subject = () => render(<App />);

  it("renders", () => {
    const { getByTestId } = subject();

    expect(getByTestId("planes")).toBeTruthy();
  });
});
