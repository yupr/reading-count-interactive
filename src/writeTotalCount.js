const { isFileExist, outputArray, outputCsv } = require("./common");
const totalMonth = require("./getTotalMonth");
const fs = require("fs").promises;

const initialValue = [];
const filePath = "./Archive/2021/total.csv";

//初期値をセット後一番下にtotalとcount(その年の合計)の行を追加
const createInitialValue = () => {
  for (let i = 0; i < 12; i++) {
    initialValue.push({ month: `${1 + i}`, count: 0 });
  }
  //最後尾にtotalと初期値をセット
  initialValue.push({
    month: "total",
    count: 0,
  });
  return;
};

const writeTotalCount = async () => {
  const isFile = await isFileExist(filePath);
  //ファイルがなかったら新規作成
  if (!isFile) {
    createInitialValue();
    const output = await outputCsv(initialValue);
    if (output) {
      //csvファイルを指定のfilePathに新規作成
      await fs.writeFile(filePath, output);
    }
  }

  let total = 0;
  let file;
  try {
    file = await fs.readFile(filePath);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log("fileが見つかりません。filePathを確認ください。");
    } else {
      console.log("err", err);
    }
    return;
  }

  const { monthCount, month } = await totalMonth.getTotalCount();
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
    console.log("indexxxx", index, data);
  });
  console.log('result', result)
  const output = await outputCsv(result);
  await fs.writeFile(filePath, output);
};

writeTotalCount();
