const { outputArray } = require('./common');
const fs = require('fs').promises

//-----コマンドライン引数-------
// const program = require('commander')
// program.parse(process.argv);
//ファイルパスをprocess.args配列から取り出す
// const filePath = program.args[0]
//-----------------------

const filePath = './output/2111.csv'

//集計するfilePathの月を抽出
const getMonnthFormFilePath = () => {
  let month = filePath.slice(filePath.length - 6, filePath.length - 4)
  if (month.slice(0, 1) === '0') {
    month = month.slice(1, 2);
  }
  return month;
}

//オブジェクトに変換後、countを集計
const getTotalCount = async () => {
  const month = getMonnthFormFilePath();
  const file = await fs.readFile(filePath)
  const result = await outputArray(file);
  let totalMonth = 0;
  for (let i = 0; i < result.length; i++) {
    const wordCount = Number(result[i].count)
    totalMonth += wordCount;
  }
  console.log( month + '月合計:', totalMonth)
  return {
    monthCount: totalMonth,
    month: month
  }
}
getTotalCount()
exports.getTotalCount = getTotalCount
