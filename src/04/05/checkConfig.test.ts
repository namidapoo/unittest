import { checkConfig } from "./checkConfig";

test("モック関数は実行時引数のオブジェクト検証ができる", () => {
  const mockFn = jest.fn();
  checkConfig(mockFn);
  expect(mockFn).toHaveBeenCalledWith({
    mock: true,
    feature: { spy: true },
  });
});

test("expect.objectContaining による部分検証", () => {
  const mockFn = jest.fn();
  checkConfig(mockFn);
  expect(mockFn).toHaveBeenCalledWith(
    // 大きなオブジェクトの場合一部だけ検証もできる
    // `expect.objectContaining` という補助関数を使う
    expect.objectContaining({
      feature: { spy: true },
    })
  );
});
