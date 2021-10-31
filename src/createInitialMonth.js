const fs = require('fs').promises;
const {
  isFileExist,
  outputCsv
} = require('./common');

//作成したい日時と文字数の初期値
const initialValue = [{
  date: 211101,
  count: 0
}]

const filePath = './output/2111.csv';

//作成月の日付と初期値が入力された配列オブジェクトを作成
const createInitialValue = () => {
  for (let i = 1; i < 31; i++) {
    let data = {
      date: initialValue[initialValue.length - 1].date + 1,
      count: 0
    }
    initialValue.push(data)
  }
  return;
}

//変換されたcsvを新規ファイルで作成
const createNewFile = (async () => {
  const isFile = await isFileExist(filePath);
  //ファイルが存在しなかったら新規作成
  if (!isFile) {
    createInitialValue()
    const output = await outputCsv(initialValue);
    if (output) {
      //書き出したいファイル名を指定
      await fs.writeFile(filePath, output)
    }
  }
})
createNewFile()
