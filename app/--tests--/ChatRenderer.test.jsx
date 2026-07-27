import { render, screen } from "@testing-library/react";
import ChatRenderer from "../app/chat/Chat"; // adjust path if needed

test("shows streaming message", () => {
    render(<ChatRenderer state="streaming" text="Hello" />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  test("shows error message", () => {
    render(<ChatRenderer state="error" />);
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
  
