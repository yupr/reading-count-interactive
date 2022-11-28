import { writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { outputCsv } from './common/index.js';
import { Command } from 'commander';

const program = new Command();

//コマンドライン引数をパース
program.parse(process.argv);

const createDate = program.args[0];
const filePath = `./output/${createDate}.csv`;
const initialMonth = [];

//作成月の日付と初期値が入力された配列オブジェクトを作成
const createInitialMonth = () => {
  for (let i = 0; i < 31; i++) {
    //作成したい年月にセット
    const firstDate = createDate + '01';
    initialMonth.push({ date: `${Number(firstDate) + i}`, count: 0 });
  }
};

//変換されたcsvを新規ファイルで作成
const createNewFile = async () => {
  const isFile = existsSync(filePath);

  if (isFile) {
    console.log(
      '入力した日付のCSVファイルが既に存在するので、作成しませんでした。'
    );
    return;
  }

  createInitialMonth();
  const output = await outputCsv(initialMonth);
  if (!output) return;

  //書き出したいファイル名を指定
  await writeFile(filePath, output);
};

createNewFile();
