const fs = require('fs').promises
const parse = require('csv-parse')
const program = require('commander')

//コマンドライン引数をcommanderでパース
program.parse(process.argv);

//ファイルパスをprocess.args配列から取り出す
const filePath = program.args[0]

//csvファイルを配列オブジェクトに変換
const outputArray = () => {
  return new Promise(async (resolve, reject) => {
    //集計したいファイル名を指定
    try {
      const file = await fs.readFile(filePath)
      parse(file, {
        columns: true,
      }, (err, output) => {
        if (err) {
          reject(err)
          return;
        }
        resolve(output)
      })
    } catch (err) {
      console.log('error', err)
    }
  })
}

//変換されたオブジェクトからcountのtotalを集計
const getTotalCount = async () => {
  const result = await outputArray();
  let totalCount = 0;
  for (let i = 0; i < result.length; i++) {
    const wordCount = Number(result[i].count)
    totalCount += wordCount;
  }
  console.log('計:', totalCount)
}
getTotalCount()
