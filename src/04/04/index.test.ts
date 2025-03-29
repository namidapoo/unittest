import { getMyArticleLinksByCategory } from ".";
import * as Fetchers from "../fetchers";
import { getMyArticlesData, httpError } from "../fetchers/fixtures";

jest.mock("../fetchers");

/**
 * テストに必要なセットアップを、必要最小限のパラメータで切り替え可能にしたユーティリティ関数
 * @param status HTTPステータスコード
 * @returns {jest.SpyInstance} - Fetchers.getMyArticlesのモック
 * @description ステータスコードに応じて、成功時はデータを返し、エラー時はHTTPエラーをスローします
 */
function mockGetMyArticles(status = 200) {
  if (status > 299) {
    return jest
      .spyOn(Fetchers, "getMyArticles")
      .mockRejectedValueOnce(httpError);
  }
  return jest
    .spyOn(Fetchers, "getMyArticles")
    .mockResolvedValueOnce(getMyArticlesData);
}

test("指定したタグをもつ記事が一件もない場合、null が返る", async () => {
  mockGetMyArticles();
  const data = await getMyArticleLinksByCategory("playwright");
  expect(data).toBeNull();
});

test("指定したタグをもつ記事が一件以上ある場合、リンク一覧が返る", async () => {
  mockGetMyArticles();
  const data = await getMyArticleLinksByCategory("testing");
  expect(data).toMatchObject([
    {
      link: "/articles/howto-testing-with-typescript",
      title: "TypeScript を使ったテストの書き方",
    },
    {
      link: "/articles/react-component-testing-with-jest",
      title: "Jest ではじめる React のコンポーネントテスト",
    },
  ]);
});

// 書籍にあったcatchを使った書き方
test("データ取得に失敗した場合、reject される", async () => {
  mockGetMyArticles(500);
  await getMyArticleLinksByCategory("testing").catch((err) => {
    expect(err).toMatchObject({
      err: { message: "internal server error" },
    });
  });
});

// rejects を使った書き方
test("データ取得に失敗した場合、reject される", async () => {
  mockGetMyArticles(500);
  await expect(getMyArticleLinksByCategory("testing")).rejects.toMatchObject({
    err: { message: "internal server error" },
  });
});

// try-catch を使った書き方
test("データ取得に失敗した場合、reject される", async () => {
  expect.assertions(1);
  mockGetMyArticles(500);
  try {
    await getMyArticleLinksByCategory("testing");
  } catch (err) {
    expect(err).toMatchObject({
      err: { message: "internal server error" },
    });
  }
});
