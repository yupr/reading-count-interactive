# 多読の単語カウント
  - 指定した月の全日付(1~31日)と単語数の初期値をセットしたcsvファイルを自動で作成
    - `initialValue`変数の`date`プ`ロパティに作成したい日付を設定 (例: 2021年10月なら 211001)
    - `createNewFile`関数の`fs.writeFile`の第1引数に書き出たいファイル名を指定
    - `node createCsvFile`を実行
  - 指定したcsvファイルを読み取り、その月に読んだ単語数を集計
    - `outputArray`関数の`fs.readFileSync`の引数に集計したcsvファイルを指定
    - `node getTotal`を実行
