import { readFile, parseCsvToArray, outputCsv } from './common/index.js';
import { getMonthTotalCount } from './getMonthTotalCount.js';
import { writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import _ from 'lodash';

const filePath = './Archive/2022/total.csv';

//初期値をセット後一番下にtotalとcount(その年の合計)の行を追加
const createInitialValue = async () => {
  const initialValue = [];

  const result = [...Array(11)].map((_, i) => {
    const target = i + 1;
    const month = String(target).padStart(2, '0');
    return { month: month, count: 0, ...initialValue };
  });

  const createValue = _.cloneDeep([
    ...result,
    ...[{ month: 'total', count: 0 }],
  ]);

  const outputCsvData = await outputCsv(createValue);

  //csvファイルを指定のfilePathに新規作成
  await writeFile(filePath, outputCsvData);
};

//ファイルがあれば,アップデート
const writeTotalCount = async () => {
  const isFile = existsSync(filePath);
  if (!isFile) await createInitialValue();

  const result = await getMonthTotalCount();
  if (!result) return;

  const { monthTotalCount, month } = result;
  const file = await readFile(filePath);
  const outputArrayData = await parseCsvToArray(file);

  let total = 0;
  outputArrayData.forEach((data, index) => {
    if (data.month === month) {
      data.count = monthTotalCount;
    }
    //最後尾で集計結果をtotalのcountに代入
    if (index === 12) {
      data.count = total;
    } else {
      //1~12月のcountを集計
      total += Number(data.count);
    }
  });

  const outputCsvData = await outputCsv(outputArrayData);
  await writeFile(filePath, outputCsvData);
};

writeTotalCount();
