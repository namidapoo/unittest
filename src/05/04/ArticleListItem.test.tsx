import { render, screen } from "@testing-library/react";
import { ArticleListItem, ItemProps } from "./ArticleListItem";

const item: ItemProps = {
  id: "howto-testing-with-typescript",
  title: "TypeScript を使ったテストの書き方",
  body: "テストを書く時、TypeScript を使うことで、テストの保守性が向上します…",
};

test("ID に紐づいたリンクが表示される", () => {
  // Arrange
  // Act
  render(<ArticleListItem {...item} />);
  // Assert
  expect(screen.getByRole("link", { name: "もっと見る" })).toHaveAttribute(
    "href",
    "/articles/howto-testing-with-typescript"
  );
});

test("Snapshot: 一覧要素が表示される", () => {
  // Arrange
  // Act
  const { container } = render(<ArticleListItem {...item} />);
  // Assert
  expect(container).toMatchSnapshot();
});
