import { parseCsvToArray } from './common/index';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { dailyCount } from './type';

// 集計するfilePathの月を抽出
const getMonthFromFilePath = ({ date }: { date: string }) => {
  const month = date.slice(2, 4);
  return month;
};

// 入力した日付の月と、その合計を返す
export const getMonthTotalCount = async ({
  date,
  filePath,
}: {
  date: string;
  filePath: string;
}) => {
  try {
    const isFile = existsSync(filePath);
    if (!isFile) {
      throw new Error('file not found in output directory');
    }

    const month = getMonthFromFilePath({ date });
    const file = await readFile(filePath);
    const result: dailyCount[] = await parseCsvToArray(file);

    let monthTotalCount = 0;
    for (let i = 0; i < result.length; i++) {
      const wordCount = Number(result[i].count);
      monthTotalCount += wordCount;
    }
    console.log(month + '月合計:', monthTotalCount);

    return {
      monthTotalCount,
      month,
    };
  } catch (err) {
    console.log('err', err);
    throw new Error('failed getMonthTotalCount');
  }
};
