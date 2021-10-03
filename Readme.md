# 多読管理サービス
  - 指定した月の日付(1~31日)と単語数の初期値の一覧をセットしたcsvファイルを自動で作成
    - `initialValue`変数の`date`プロパティに作成したい日付を設定 (例: 2021年10月なら 211001)
    - `createNewFile`関数の`fs.writeFile`の第1引数に書き出たいファイル名を指定
    - `yarn create`を実行
  - 指定したcsvファイルを読み取り、その月に読んだ単語数を集計
    - `outputArray`関数の`fs.readFileSync`の引数に集計したcsvファイルを指定
    - `yarn total`を実行

  - todo: 特定のディレクトリにある全ファイルを一気に集計させる機能
    - /Archive/2021にあるファイルを回して、それぞれの合計文字数を出力後、その年のトータルも出力
      - (例: 2107: 30000語, 2108: 2000語, 2021年の合計: 32000語 )

  - total.csvで月別で集計された文字数の合計を算出
    - vscodeの `Emmet: Evaluate Math Expression`
