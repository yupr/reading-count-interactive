//指定した月の多読数をカウント
import { readFile, outputArray } from './common/index.js';
import { existsSync } from 'fs';
import program from 'commander';

//コマンドライン引数をパース
program.parse(process.args);

const date = program.args[0];
const filePath = `./output/${date}.csv`;

// 集計するfilePathの月を抽出
const getMonthFromFilePath = () => {
  let month = date.slice(2, 4);

  return month;
};

//オブジェクトに変換後、月と、その総数を返す
export const getMonthTotalCount = async () => {
  const isFile = existsSync(filePath);
  if (!isFile) {
    console.log('outputディレクトリにファイルが見つかりません。');
    return;
  }

  const month = getMonthFromFilePath();
  const file = await readFile(filePath);
  const result = await outputArray(file);

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
