// 指定した月の多読数をカウント
import { readFile, parseCsvToArray } from './common/index';
import { existsSync } from 'fs';
import { Command } from 'commander';
import { dailyCount } from './type';

const program = new Command();
program.parse(process.argv);

const date = program.args[0];
const filePath = `./output/${date}.csv`;

// 集計するfilePathの月を抽出
const getMonthFromFilePath = () => {
  const month = date.slice(2, 4);
  return month;
};

// 入力した日付の月と、その総数を返す
export const getMonthTotalCount = async (): Promise<
  Error | { monthTotalCount: number; month: string }
> => {
  const isFile = existsSync(filePath);

  if (!isFile) {
    return new Error('file not found in output directory');
  }

  const month = getMonthFromFilePath();
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
};
