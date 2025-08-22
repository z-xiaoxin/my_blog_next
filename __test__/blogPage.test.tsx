import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import BlogPage from "@/app/(main)/page";

test("BlogPage", () => {
  render(<BlogPage />);
  expect(screen.getByText("hello get")).toBeDefined();
});
