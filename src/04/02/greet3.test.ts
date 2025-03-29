import { greet, sayGoodBye } from "./greet";

// 関数単位ではなくファイル単位でモックする
// モックすると`undefined`を返すようになる
// モックに実装を施したい場合は`jest.mock`の第二引数にオブジェクトを渡す
jest.mock("./greet", () => ({
  sayGoodBye: (name: string) => `Good bye, ${name}.`,
}));

test("挨拶が未実装（本来の実装ではない）", () => {
  expect(greet).toBe(undefined);
});

test("さよならを返す（本来の実装ではない）", () => {
  const message = `${sayGoodBye("Taro")} See you.`;
  expect(message).toBe("Good bye, Taro. See you.");
});
