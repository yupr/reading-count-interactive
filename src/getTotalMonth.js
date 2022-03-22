// 指定した月の多読数をカウント
import { readFile, outputArray } from './common/index.js';
import { existsSync } from 'fs';
const filePath = './output/2203.csv';

//集計するfilePathの月を抽出
const getMonthFromFilePath = () => {
  let month = filePath.slice(filePath.length - 6, filePath.length - 4);
  if (month.slice(0, 1) === '0') {
    month = month.slice(1, 2);
  }
  return month;
};

//オブジェクトに変換後、countを集計
export const getTotalCount = async () => {
  const month = getMonthFromFilePath();
  const isFile = existsSync(filePath);

  if (isFile) {
    const file = await readFile(filePath);
    const result = await outputArray(file);
    let totalMonth = 0;
    for (let i = 0; i < result.length; i++) {
      const wordCount = Number(result[i].count);
      totalMonth += wordCount;
    }
    console.log(month + '月合計:', totalMonth);
    return {
      totalMonth,
      month,
    };
  }
};
