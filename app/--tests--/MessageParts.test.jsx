import { render, screen } from "@testing-library/react";
import ChatRenderer from "../app/chat/Chat";

test("renders multiple message parts", () => {
  const parts = [
    { type: "text", content: "Hello" },
    { type: "code", content: "console.log('hi')" }
  ];

  render(<ChatRenderer state="done" parts={parts} />);

  expect(screen.getByText("Hello")).toBeInTheDocument();
  expect(screen.getByText(/console\.log/)).toBeInTheDocument();
});
