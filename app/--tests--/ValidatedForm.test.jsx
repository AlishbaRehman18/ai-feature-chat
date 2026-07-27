import { render, screen, fireEvent } from "@testing-library/react";
import ValidatedForm from "../components/ValidatedForm";

test("shows validation error when empty", () => {
  render(<ValidatedForm />);

  fireEvent.click(screen.getByRole("button", { name: /submit/i }));

  expect(screen.getByText(/required/i)).toBeInTheDocument();
});
