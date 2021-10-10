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

const filePath = './Test/2021/total.csv';

//最後尾にtotalとcount(その年の合計)を追加し、初期値をセット
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
  //ファイルが作成されているかチェック
  const isFile = await isFileExist(filePath);

  //ファイルがなかったら新規作成
  if (!isFile) {
    createInitialValue()
    const output = await outputCsv(initialValue);
    if (output) {
      //書き出したいファイル名を指定
      await fs.writeFile(filePath, output)
    }
  }

  const {
    monthCount,
    month
  } = await totalMonth.getTotalCount();
  let row = [];
  let total = 0;

  const result = await outputArray(filePath);
  result.forEach(element => {
    console.log('element', element)
    if (element.month === month) {
      element.count = monthCount;
    }

    if (element.month === 'total') {
      element.count = total;
    } else {
      //1~12月のcountの合計を代入
      total += Number(element.count);
    }
    row.push(element)
  });

  const output = await outputCsv(row)
  await fs.writeFile(filePath, output);
}

writeTotalCount();
