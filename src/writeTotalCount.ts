import { parseCsvToArray, outputCsv } from './common/index';
import { getMonthTotalCount } from './getMonthTotalCount';
import { writeFile, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import _ from 'lodash';
import { monthlyTotal } from './type';

const filePath = './Archive/2023/total.csv';

// 初期値をセット後、月別の合計値の総計(total)を行の最後尾に追加
const createInitialValue = async () => {
  try {
    const initialValue: monthlyTotal[] = [];
    const result = [...Array(11)].map((_, i) => {
      const target = i + 1;
      const month = String(target).padStart(2, '0');
      return { month: month, count: 0, ...initialValue };
    });

    const createTotalCount: monthlyTotal[] = _.cloneDeep([
      ...result,
      ...[{ month: 'total', count: 0 }],
    ]);

    const outputCsvData = await outputCsv(createTotalCount);

    //csvファイルを指定のfilePathに新規作成
    await writeFile(filePath, outputCsvData);
  } catch (err) {
    throw new Error('total.csvの作成に失敗');
  }
};

// ファイルがあれば,アップデート
const writeTotalCount = async () => {
  try {
    const isFile = existsSync(filePath);
    if (!isFile) await createInitialValue();

    const result = await getMonthTotalCount();
    const file = await readFile(filePath);
    const outputArrayData: monthlyTotal[] = await parseCsvToArray(file);

    if (result) {
      const { monthTotalCount, month } = result;
      let total = 0;

      outputArrayData.forEach((data, index: number) => {
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
    }
  } catch (err) {
    console.error('writeTotalCount error', err);
  }
};

writeTotalCount();
