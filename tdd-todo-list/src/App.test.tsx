import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { MemoryRouter } from "react-router-dom";

test("render learn react link", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>,
  );
  
  const linkElement = screen.getByText("할 일 목록");
  expect(linkElement).toBeInTheDocument();
});
