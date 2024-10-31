import { parseCsvToArray, outputCsv } from './common/index';
import { getMonthTotalCount } from './getMonthTotalCount';
import { writeFile, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import _ from 'lodash';
import { monthlyTotal } from './type';
import { select } from '@inquirer/prompts';
import { DAILY_COUNT_DIRECTORY, TOTAL_COUNT_DIRECTORY } from './constants';
import { Command } from 'commander';

// コマンドライン引数
const program = new Command();
program.parse(process.argv);

// 読後数の集計を行いたい年を選択
const writeTotalCount = async () => {
  const selectedYear = await select({
    message: '集計したい年を教えてください。',
    choices: [
      {
        name: '2023',
        value: '2023',
      },
      {
        name: '2024',
        value: '2024',
      },
      {
        name: '2025',
        value: '2025',
      },
    ],
  });

  const isDirectory = existsSync(`${TOTAL_COUNT_DIRECTORY}/${selectedYear}`);

  if (!isDirectory) {
    console.error(
      `archiveディレクトリに ${selectedYear} のディレクトリが作成されていません。作成してください。`,
    );
    return;
  }

  try {
    const totalCountFilePath = `${TOTAL_COUNT_DIRECTORY}/${selectedYear}/total.csv`;
    const isFile = existsSync(totalCountFilePath);

    // 指定のパスに total.csv が存在しなければ作成する。
    if (!isFile) {
      await createTotalInitialValue({ filePath: totalCountFilePath });
    }

    // output ディレクトリ配下の指定のファイルの月の読後数の合計を算出
    const date = program.args[0];
    const dailyCountFilePath = `${DAILY_COUNT_DIRECTORY}/${date}.csv`;
    const result = await getMonthTotalCount({
      date,
      filePath: dailyCountFilePath,
    });

    // archive 配下の指定のファイルパスに total.csv を更新する。(なければ作成する)
    const file = await readFile(totalCountFilePath);
    const outputArrayData: monthlyTotal[] = await parseCsvToArray(file);

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
    await writeFile(totalCountFilePath, outputCsvData);
  } catch (err) {
    console.error('writeTotalCount err:', err);
  }
};

// 初期値をセットした totat.csv 指定の filepath に作成
const createTotalInitialValue = async ({ filePath }: { filePath: string }) => {
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

writeTotalCount();
