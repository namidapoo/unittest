import { fireEvent, logRoles, render, screen } from "@testing-library/react";
import { Form } from "./Form";

test("名前の表示", () => {
  // Arrange
  // Act
  render(<Form name="taro" />);
  // Assert
  expect(screen.getByText("taro")).toBeInTheDocument();
});

test("ボタンの表示", () => {
  // Arrange
  // Act
  render(<Form name="taro" />);
  // Assert
  expect(screen.getByRole("button")).toBeInTheDocument();
});

test("見出しの表示", () => {
  // Arrange
  // Act
  render(<Form name="taro" />);
  // Assert
  expect(screen.getByRole("heading")).toHaveTextContent("アカウント情報");
});

test("ボタンを押下すると、イベントハンドラーが呼ばれる", () => {
  // Arrange
  const mockFn = jest.fn();
  render(<Form name="taro" onSubmit={mockFn} />);
  // Act
  fireEvent.click(screen.getByRole("button"));
  // Assert
  expect(mockFn).toHaveBeenCalled();
});

test("Snapshot: アカウント名「taro」が表示される", () => {
  // Arrange
  // Act
  const { container } = render(<Form name="taro" />);
  // Assert
  expect(container).toMatchSnapshot();
});

test("logRoles: レンダリング結果からロール・アクセシブルネームを確認", () => {
  // Arrange
  const { container } = render(<Form name="taro" />);
  // Act
  logRoles(container);
  // Assert
  expect(container).toMatchSnapshot();
});
