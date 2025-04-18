import { render, screen } from "@testing-library/react";
import { mockPostMyAddress } from "./fetchers/mock";
import { RegisterAddress } from "./RegisterAddress";
import {
  clickSubmit,
  inputContactNumber,
  inputDeliveryAddress,
} from "./testingUtils";

jest.mock("./fetchers");

// すべての入力欄に値を入力して、送信ボタンを押下するヘルパー関数
async function fillValuesAndSubmit() {
  const contactNumber = await inputContactNumber();
  const deliveryAddress = await inputDeliveryAddress();
  const submitValues = { ...contactNumber, ...deliveryAddress };
  await clickSubmit();
  return submitValues;
}

// 不正な入力値を入力して、送信ボタンを押下するヘルパー関数
async function fillInvalidValuesAndSubmit() {
  const contactNumber = await inputContactNumber({
    name: "田中 太郎",
    phoneNumber: "abc-defg-hijkl",
  });
  const deliveryAddress = await inputDeliveryAddress();
  const submitValues = { ...contactNumber, ...deliveryAddress };
  await clickSubmit();
  return submitValues;
}

// テストの前にモック関数をリセットする
beforeEach(() => {
  jest.resetAllMocks();
});

test("成功時「登録しました」が表示される", async () => {
  // Arrange
  const mockFn = mockPostMyAddress();
  render(<RegisterAddress />);
  // Act
  const submitValues = await fillValuesAndSubmit();
  // Assert
  expect(mockFn).toHaveBeenCalledWith(expect.objectContaining(submitValues));
  expect(screen.getByText("登録しました")).toBeInTheDocument();
});

test("失敗時「登録に失敗しました」が表示される", async () => {
  // Arrange
  const mockFn = mockPostMyAddress(500);
  render(<RegisterAddress />);
  // Act
  const submitValues = await fillValuesAndSubmit();
  // Assert
  expect(mockFn).toHaveBeenCalledWith(expect.objectContaining(submitValues));
  expect(screen.getByText("登録に失敗しました")).toBeInTheDocument();
});

test("バリデーションエラー時「不正な入力値が含まれています」が表示される", async () => {
  // Arrange
  render(<RegisterAddress />);
  // Act
  await fillInvalidValuesAndSubmit();
  // Assert
  expect(screen.getByText("不正な入力値が含まれています")).toBeInTheDocument();
});

test("不明なエラー時「不明なエラーが発生しました」が表示される", async () => {
  // Arrange
  render(<RegisterAddress />);
  // モック関数が実行されていないのでWeb APIのリクエストを処理できない
  // なのでこれをそのまま不明なエラーの発生状況の再現として使用する

  // Act
  await fillValuesAndSubmit();
  // Assert
  expect(screen.getByText("不明なエラーが発生しました")).toBeInTheDocument();
});

test("Snapshot: 登録フォームが表示される", async () => {
  // Arrange
  mockPostMyAddress();
  // const mockFn = mockPostMyAddress();
  // Act
  const { container } = render(<RegisterAddress />);
  // const submitValues = await fillValuesAndSubmit();
  // expect(mockFn).toHaveBeenCalledWith(expect.objectContaining(submitValues));
  // Assert
  expect(container).toMatchSnapshot();
});
