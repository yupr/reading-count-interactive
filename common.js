const fs = require('fs').promises
const stringify = require('csv-stringify')
const parse = require('csv-parse')

//ファイルが作成されているかチェック
exports.isFileExist = async (filePath) => {
  let isExist = false;
  try {
    await fs.readFile(filePath)
    isExist = true;
  } catch (err) {
    // console.log('err', err)
    isExist = false;
  }
  return isExist;
}

//csvを配列に変換
exports.outputArray = (filePath) => {
  return new Promise(async (resolve, reject) => {
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

//配列をcsvに変換
exports.outputCsv = ((data) => {
  return new Promise((resolve, reject) => {
    stringify(data, {
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
