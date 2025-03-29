import { greet } from "./greet";

// 関数単位ではなくファイル単位でモックする
jest.mock("./greet");

test("挨拶を返さない（本来の実装ではない）", () => {
  expect(greet("Taro")).toBe(undefined);
});
