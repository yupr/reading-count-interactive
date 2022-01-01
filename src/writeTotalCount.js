const { readFile, outputArray, outputCsv } = require("./common");
const { getTotalCount } = require("./getTotalMonth");
const fs = require("fs").promises;
const clonedeep = require("lodash/clonedeep");

const initialValue = [];
const filePath = "./Archive/2022/total.csv";

//初期値をセット後一番下にtotalとcount(その年の合計)の行を追加
const createInitialValue = async () => {
  const file = await readFile(filePath, { isCreate: true });
  //ファイルがなかったら新規作成
  if (!file) {
    for (let i = 0; i < 12; i++) {
      initialValue.push({ month: `${1 + i}`, count: 0 });
    }
    //最後尾にtotalと初期値(count = 0)をセット
    const createValue = clonedeep([
      ...initialValue,
      ...[{ month: "total", count: 0 }],
    ]);
    const output = await outputCsv(createValue);
    if (output) {
      //csvファイルを指定のfilePathに新規作成
      await fs.writeFile(filePath, output);
    }
  }
  return;
};

const writeTotalCount = async () => {
  await createInitialValue();
  //ファイルがあれば,アップデートする。
  const file = await readFile(filePath, { isUpdate: true });
  const { monthCount, month } = await getTotalCount;
  if (file && monthCount && month) {
    let total = 0;
    const result = await outputArray(file);
    result.forEach((data, index) => {
      if (data.month === month) {
        data.count = monthCount;
      }
      //最後尾で集計結果をtotalのcountに代入
      if (index === 12) {
        data.count = total;
      } else {
        //1~12月のcountを集計
        total += Number(data.count);
      }
    });
    const output = await outputCsv(result);
    await fs.writeFile(filePath, output);
  }
};
writeTotalCount();
