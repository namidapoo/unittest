import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputAccount } from "./InputAccount";

const user = userEvent.setup();

test("fieldset のアクセシブルネームは、legend を引用している", () => {
  // Arrange
  // Act
  render(<InputAccount />);
  // Assert
  expect(
    screen.getByRole("group", { name: "アカウント情報の入力" })
  ).toBeInTheDocument();
});

test("メールアドレス入力欄", async () => {
  // Arrange
  render(<InputAccount />);
  const textbox = screen.getByRole("textbox", { name: "メールアドレス" });
  const value = "taro.tanaka@example.com";
  // Act
  await user.type(textbox, value);
  // Assert
  // 入力フィールドの値は`getByText`ではなく`getByDisplayValue`で取得する
  expect(screen.getByDisplayValue(value)).toBeInTheDocument();
});

test("パスワード入力欄", async () => {
  // Arrange
  render(<InputAccount />);
  // Assert
  expect(() => screen.getByPlaceholderText("8文字以上で入力")).not.toThrow();
  expect(() => screen.getByRole("textbox", { name: "パスワード" })).toThrow();
  // 以下でも同じ?
  expect(screen.queryByRole("textbox", { name: "パスワード" })).not.toBeInTheDocument()
});

test("パスワード入力欄", async () => {
  // Arrange
  render(<InputAccount />);
  const password = screen.getByPlaceholderText("8文字以上で入力");
  const value = "abcd1234";
  // Act
  await user.type(password, value);
  // Assert
  expect(screen.getByDisplayValue(value)).toBeInTheDocument();
});

test("Snapshot: アカウント情報の入力フォームが表示される", () => {
  // Arrange
  // Act
  const { container } = render(<InputAccount />);
  // Assert
  expect(container).toMatchSnapshot();
});
