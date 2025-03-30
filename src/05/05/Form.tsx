import { useId, useState } from "react";
import { Agreement } from "./Agreement";
import { InputAccount } from "./InputAccount";

export const Form = () => {
  const [checked, setChecked] = useState(false);
  const headingId = useId();
  return (
    // `aria-labelledby` に<h2>要素の`id`を指定することで、
    // フォームのラベルを<h2>要素のテキストにすることができる
    // HTML要素の`id`属性はドキュメント内で一意である必要がある
    // `useId`を使うと一意の`id`を生成することができるので自動生成・自動管理に便利
    <form aria-labelledby={headingId}>
      <h2 id={headingId}>新規アカウント登録</h2>
      <InputAccount />
      <Agreement
        onChange={(event) => {
          setChecked(event.currentTarget.checked);
        }}
      />
      <div>
        <button disabled={!checked}>サインアップ</button>
      </div>
    </form>
  );
};
