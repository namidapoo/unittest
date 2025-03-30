import { render, screen, within } from "@testing-library/react";
import { ArticleList } from "./ArticleList";
import { items } from "./fixture";

test("タイトルの表示", () => {
  // Arrange
  // Act
  render(<ArticleList items={items} />);
  // Assert
  expect(screen.getByRole("heading", { name: "記事一覧" })).toBeInTheDocument();
});

test("items の数だけ一覧表示される", () => {
  // Arrange
  // Act
  render(<ArticleList items={items} />);
  // Assert
  expect(screen.getAllByRole("listitem")).toHaveLength(3);
});

test("items の数だけ一覧表示される", () => {
  // Arrange
  render(<ArticleList items={items} />);
  // Act
  const list = screen.getByRole("list");
  // Assert
  expect(list).toBeInTheDocument();
  // `list` の中に `listitem` が 3 つあることを確認したいので
  // `within` を使って `list` の中に絞って確認する
  expect(within(list).getAllByRole("listitem")).toHaveLength(3);
});

test("一覧アイテムが空のとき「投稿記事がありません」が表示される", () => {
  // Arrange
  render(<ArticleList items={[]} />);
  // Act
  const list = screen.queryByRole("list");
  // Assert
  // `not.toBeInTheDocument` と `toBeNull` は同じことを検証するのでどちらかでいい
  expect(list).not.toBeInTheDocument();
  expect(list).toBeNull();
  expect(screen.getByText("投稿記事がありません")).toBeInTheDocument();
});

test("Snapshot: items の数だけ一覧表示される", () => {
  // Arrange
  // Act
  const { container } = render(<ArticleList items={items} />);
  // Assert
  expect(container).toMatchSnapshot();
});
