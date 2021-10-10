# 読んだ単語数を月や年単位で集計
  - 指定した月の日付(1~31日)と単語数の初期値の一覧をセットしたcsvファイルを自動で作成(`createInitialMonth.js`)
    - `initialValue`変数の`date`プロパティに作成したい日付を設定 (例: 2021年10月なら 211001)
    - `filePath`変数に作成したいファイル名とそのpathを指定。
      - 実行: `yarn createFile` or `node createInitialMonth`
  - csvファイルから、その月に読んだ単語を集計(`getTotalMonth.js`)
    - `filePath`変数に集計したいpathを指定。
      - 実行: `yarn total` or `node getTotalMonth`
  - 月別の集計結果とその年の合計をtotal.csvに追記(なかったら新規作成する)
    - 実行: `node writeTotalCount`

