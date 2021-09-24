const fs = require('fs').promises;
const stringify = require('csv-stringify')

//作成したい日時と文字数の初期値
const initialValue = [{
  date: 211001,
  count: 0
}]

//その月分の日付と初期値が入力された配列オブジェクトを作成
for (let i = 1; i < 31; i++) {
  let data = {
    date: initialValue[initialValue.length - 1].date + 1,
    count: 0
  }
  initialValue.push(data)
}

//配列オブジェクトをcsvに変換
const outputCsv = (() => {
  return new Promise((resolve, reject) => {
    stringify(initialValue, {
      header: true
    }, (err, output) => {
      if (err) {
        reject(err)
        return;
      }
      resolve(output)
    })
  })
})

//ファイルの存在チェック
const isFileExist = async () => {
  let isExist = false;
  try {
    await fs.readFile('./2108.csv')
    isExist = true;
  } catch (err) {
    isExist = false;
  }
  return isExist;
}

//変換されたcsvを新規ファイルで作成
const createNewFile = (async () => {
  const isFile = await isFileExist();

  //ファイルが存在しなかったら新規作成
  if (!isFile) {
    const output = await outputCsv();
    if (output) {
      //書き出したいファイル名を指定
      await fs.writeFile('2110.csv', output)
    }
  }
})

createNewFile()
