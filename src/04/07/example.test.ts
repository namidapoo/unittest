// 実行順を理解するためのサンプルコード

// beforeAll(() => console.log("1 - beforeAll"));
// afterAll(() => console.log("1 - afterAll"));
// beforeEach(() => console.log("1 - beforeEach"));
// afterEach(() => console.log("1 - afterEach"));

// test("", () => console.log("1 - test"));

// describe("Scoped / Nested block", () => {
//     beforeAll(() => console.log("2 - beforeAll"));
//     afterAll(() => console.log("2 - afterAll"));
//     beforeEach(() => console.log("2 - beforeEach"));
//     afterEach(() => console.log("2 - afterEach"));
//     test("", () => console.log("2 - test"));
// });

// 実行順
// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll

// ポイント
// - beforeAllとafterAllはそれぞれのスコープで一度だけ実行されます
// - beforeEachとafterEachは各テストごとに実行されます
// - 内側のスコープは外側のスコープのbeforeEachとafterEachを継承します
// - 実行順序は「外から内」（beforeEach）、「内から外」（afterEach）です
