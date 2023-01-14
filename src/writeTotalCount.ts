import { parseCsvToArray, outputCsv } from './common/index';
import { getMonthTotalCount } from './getMonthTotalCount';
import { writeFile, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import _ from 'lodash';
import { monthlyTotal } from './type';

const filePath = './Archive/2023/total.csv';

// 初期値をセットした totat.csv 指定の filepath に作成
const createTotalInitialValue = async () => {
  try {
    const initialValue: monthlyTotal[] = [];

    const result = [...Array(12)].map((_, i) => {
      const target = i + 1;
      const month = String(target).padStart(2, '0');
      return { month: month, count: 0, ...initialValue };
    });

    const createTotalCount: monthlyTotal[] = _.cloneDeep([
      ...result,
      ...[{ month: 'total', count: 0 }],
    ]);

    const outputCsvData = await outputCsv(createTotalCount);
    await writeFile(filePath, outputCsvData);
  } catch {
    throw new Error('total.csvの作成に失敗');
  }
};

// ファイルがあれば,アップデート
const writeTotalCount = async () => {
  try {
    const isFile = existsSync(filePath);
    if (!isFile) {
      await createTotalInitialValue();
    }

    const result = await getMonthTotalCount();
    const file = await readFile(filePath);
    const outputArrayData: monthlyTotal[] = await parseCsvToArray(file);

    const { monthTotalCount, month } = result;
    let total = 0;

    outputArrayData.forEach((data, index: number) => {
      console.log('ddddd', data, index);

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
  } catch (err) {
    console.error('writeTotalCount err:', err);
  }
};

writeTotalCount();
