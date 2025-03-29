import { greet, sayGoodBye } from "./greet";

jest.mock("./greet", () => ({
  // モジュール本来の実装をそのまま使う
  ...jest.requireActual("./greet"),
  // モックの実装を追加する
  sayGoodBye: (name: string) => `Good bye, ${name}.`,
}));

test("挨拶を返す（本来の実装どおり）", () => {
  expect(greet("Taro")).toBe("Hello! Taro.");
});

test("さよならを返す（本来の実装ではない）", () => {
  // expect(() => sayGoodBye("Taro")).toThrow();
  const message = `${sayGoodBye("Taro")} See you.`;
  expect(message).toBe("Good bye, Taro. See you.");
});
