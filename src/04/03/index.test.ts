import { getGreet } from ".";
import * as Fetchers from "../fetchers";
import { httpError } from "../fetchers/fixtures";

jest.mock("../fetchers");

describe("getGreet", () => {
  test("データ取得成功時：ユーザー名がない場合", async () => {
    // getMyProfile が resolve した時の値を再現
    jest.spyOn(Fetchers, "getMyProfile").mockResolvedValueOnce({
      id: "xxxxxxx-123456",
      email: "taroyamada@myapi.testing.com",
    });
    await expect(getGreet()).resolves.toBe("Hello, anonymous user!");
    // 以下でも同義
    // expect(await getGreet()).toBe("Hello, anonymous user!");
  });
  test("データ取得成功時：ユーザー名がある場合", async () => {
    jest.spyOn(Fetchers, "getMyProfile").mockResolvedValueOnce({
      id: "xxxxxxx-123456",
      email: "taroyamada@myapi.testing.com",
      name: "taroyamada",
    });
    await expect(getGreet()).resolves.toBe("Hello, taroyamada!");
    // 以下でも同義
    // expect(await getGreet()).toBe("Hello, taroyamada!");
  });
  // データ取得失敗時に関連コードがどのように振る舞うかをテストするという観点
  test("データ取得失敗時", async () => {
    // getMyProfile が reject した時の値を再現
    jest.spyOn(Fetchers, "getMyProfile").mockRejectedValueOnce(httpError);
    await expect(getGreet()).rejects.toMatchObject({
      err: { message: "internal server error" },
    });
  });
  // データ取得失敗時に例外がスローされているかをテストするという観点
  test("データ取得失敗時、エラー相当のデータが例外としてスローされる", async () => {
    expect.assertions(1);
    jest.spyOn(Fetchers, "getMyProfile").mockRejectedValueOnce(httpError);
    try {
      await getGreet();
    } catch (err) {
      expect(err).toMatchObject(httpError);
    }
  });
});
