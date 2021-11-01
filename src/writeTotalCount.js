const {
  isFileExist,
  outputArray,
  outputCsv
} = require('./common');
const totalMonth = require('./getTotalMonth')
const fs = require('fs').promises

//作成する月と文字数の初期値
const initialValue = [{
  month: 1,
  count: 0
}]

const filePath = './Archive/2021/total.csv';

//初期値をセット後一番下にtotalとcount(その年の合計)の行を追加
const createInitialValue = () => {
  for (let i = 1; i < 12; i++) {
    let data = {
      month: initialValue[initialValue.length - 1].month + 1,
      count: 0
    }
    initialValue.push(data)
  }
  //最後尾にtotalと初期値をセット
  initialValue.push({
    month: 'total',
    count: 0
  })
  return;
}

const writeTotalCount = async () => {
  const isFile = await isFileExist(filePath);
  //ファイルがなかったら新規作成
  if (!isFile) {
    createInitialValue()
    const output = await outputCsv(initialValue);
    if (output) {
      //csvファイルを指定のfilePathに新規作成
      await fs.writeFile(filePath, output)
    }
  }

  const {
    monthCount,
    month
  } = await totalMonth.getTotalCount();
  let row = [];
  let total = 0;

  const file = await fs.readFile(filePath)
  const result = await outputArray(file);
  result.forEach((data, index) => {
    if (data.month === month) {
      data.count = monthCount;
    }

    //最後の行(total)で集計結果をtotalのcountに代入
    if (index === 12) {
      data.count = total;
    } else {
      //1~12月のcountを集計
      total += Number(data.count);
    }
    row.push(data)
  });
  const output = await outputCsv(row)
  await fs.writeFile(filePath, output);
}
writeTotalCount();
