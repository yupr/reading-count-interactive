const { outputArray } = require('./common');

//-----コマンドライン-------
// const program = require('commander')
// コマンドライン引数をcommanderでパース
// program.parse(process.argv);
//ファイルパスをprocess.args配列から取り出す
// const filePath = program.args[0]
//-----------------------
const filePath = './Archive/2021/2109.csv'

//集計するfilepathの月を抽出
const getMonnthFormFilePath = () => {
  let month = filePath.slice(filePath.length - 6, filePath.length - 4)
  if (month.slice(0, 1) === '0') {
    month = month.slice(1, 2);
  }
  return month;
}

//変換されたオブジェクトからcountのtotalを集計
const getTotalCount = async () => {
  const month = getMonnthFormFilePath();
  const result = await outputArray(filePath);
  let totalMonth = 0;
  for (let i = 0; i < result.length; i++) {
    const wordCount = Number(result[i].count)
    totalMonth += wordCount;
  }
  console.log( month + '月合計:', totalMonth)
  return {
    monthCount: totalMonth,
    month: Number(month)
  }
}
getTotalCount()
exports.getTotalCount = getTotalCount
