import { render, screen } from "@testing-library/react";
import ToolResult from "../components/ToolResult";

test("shows tool result", () => {
  render(<ToolResult result="Search complete" />);
  expect(screen.getByText(/search complete/i)).toBeInTheDocument();
});
