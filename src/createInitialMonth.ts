import { writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { outputCsv } from './common/index';
import { Command } from 'commander';
import { dailyCount } from './type';

const program = new Command();
program.parse(process.argv); // コマンドライン引数をパース

const createDate = program.args[0];
const filePath = `./output/${createDate}.csv`;

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
      throw new Error('file is exist in output directory');
    }

    const initialMonth = createInitialMonth();
    const output = await outputCsv(initialMonth);
    await writeFile(filePath, output); // 出力先と書き出したいファイルを指定
  } catch (err) {
    console.error('createNewFile error', err);
  }
};

createNewFile();
