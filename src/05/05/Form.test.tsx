import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form } from "./Form";

const user = userEvent.setup();

test("form のアクセシブルネームは、見出しを引用している", () => {
  // Arrange
  // Act
  render(<Form />);
  // Assert
  expect(
    screen.getByRole("form", { name: "新規アカウント登録" })
  ).toBeInTheDocument();
});

test("主要エリアが表示されている", () => {
  // Arrange
  // Act
  render(<Form />);
  // Assert
  expect(
    screen.getByRole("group", { name: "アカウント情報の入力" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("group", { name: "利用規約の同意" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "サインアップ" })
  ).toBeInTheDocument();
});

test("「サインアップ」ボタンは非活性", () => {
  // Arrange
  // Act
  render(<Form />);
  // Assert
  expect(screen.getByRole("button", { name: "サインアップ" })).toBeDisabled();
});

test("「利用規約の同意」チェックボックスを押下すると「サインアップ」ボタンは活性化", async () => {
  // Arrange
  render(<Form />);
  // Act
  await user.click(screen.getByRole("checkbox"));
  // Assert
  expect(screen.getByRole("button", { name: "サインアップ" })).toBeEnabled();
});

test("Snapshot: 新規アカウント登録フォームが表示される", () => {
  // Arrange
  // Act
  const { container } = render(<Form />);
  // Assert
  expect(container).toMatchSnapshot();
});
