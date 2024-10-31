import { writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { outputCsv } from './common/index';
import { Command } from 'commander';
import { dailyCount } from './type';
import { DAILY_COUNT_DIRECTORY } from './constants';

// コマンドライン引数
const program = new Command();
program.parse(process.argv);

const createDate = program.args[0];
const filePath = `${DAILY_COUNT_DIRECTORY}/${createDate}.csv`;

// 作成月の日付と初期値が入力された配列オブジェクトを作成
const createInitialMonth = () => {
  const initialMonth: dailyCount[] = [];
  for (let i = 0; i < 31; i++) {
    // 作成したい年月にセット
    const firstDate = createDate + '01';
    initialMonth.push({ date: `${Number(firstDate) + i}`, count: 0 });
  }
  return initialMonth;
};

// 変換されたcsvを新規ファイルで作成
const createNewFile = async () => {
  try {
    const isFile = existsSync(filePath);
    if (isFile) {
      console.error(`${filePath}は既に存在します。`);
      return;
    }

    const initialMonth = createInitialMonth();
    const output = await outputCsv(initialMonth);

    // 出力先と書き出したいファイルを指定
    await writeFile(filePath, output);
  } catch (err) {
    console.error('createNewFile err:', err);
  }
};

createNewFile();
