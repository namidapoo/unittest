import { render, screen } from "@testing-library/react";
import { Agreement } from "./Agreement";

test("fieldset のアクセシブルネームは、legend を引用している", () => {
  // Arrange
  // Act
  render(<Agreement />);
  // Assert
  expect(
    screen.getByRole("group", { name: "利用規約の同意" })
  ).toBeInTheDocument();
});

test("チェックボックスはチェックが入っていない", () => {
  // Arrange
  // Act
  render(<Agreement />);
  // Assert
  expect(screen.getByRole("checkbox")).not.toBeChecked();
});

test("利用規約へのリンクがある", () => {
  // Arrange
  // Act
  render(<Agreement />);
  // Assert
  expect(screen.getByRole("link")).toBeInTheDocument();
  expect(screen.getByRole("link")).toHaveTextContent("利用規約");
  expect(screen.getByRole("link")).toHaveAttribute("href", "/terms");
  expect(screen.getByRole("link", { name: "利用規約" })).toHaveAttribute(
    "href",
    "/terms"
  );
});

test("Snapshot: 利用規約の同意が表示される", () => {
  // Arrange
  // Act
  const { container } = render(<Agreement />);
  // Assert
  expect(container).toMatchSnapshot();
});
