import { readFile, outputArray, outputCsv } from "./common/index.js";
import { getTotalCount } from "./getTotalMonth.js";
import { writeFile } from "fs/promises";
import { existsSync } from "fs";
import clonedeep from "lodash/clonedeep.js";

const initialValue = [];
const filePath = "./Archive/2022/total.csv";

//初期値をセット後一番下にtotalとcount(その年の合計)の行を追加
const createInitialValue = async () => {
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
    await writeFile(filePath, output);
  }
};

//ファイルがあれば,アップデート
const writeTotalCount = async () => {
  //ファイルチェック
  const isFile = existsSync(filePath);
  if (!isFile) await createInitialValue();
  const { totalMonth, month } = await getTotalCount();

  if (isFile && totalMonth && month) {
    const file = await readFile(filePath);
    const result = await outputArray(file);
    let total = 0;
    result.forEach((data, index) => {
      if (data.month === month) {
        data.count = totalMonth;
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
    await writeFile(filePath, output);
  }
};
writeTotalCount();
