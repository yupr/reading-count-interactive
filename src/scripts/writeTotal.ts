import { input } from '@inquirer/prompts';
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import dedent from 'ts-dedent';
import { TOTAL_COUNT_DIRECTORY } from '../constants';

export const writeTotal = async () => {
  const isDirectory = existsSync(TOTAL_COUNT_DIRECTORY);
  if (!isDirectory) {
    console.error(
      'archive ディレクトリがルートに存在しないため作成してください。',
    );
    return;
  }

  const targetYearMonth = await input({
    message: dedent`
    月別の読後数の合計とその総計を total.csv に書き出します。
    output 配下にある集計したいファイル名を「年月」で記載してください。
    例: output/2211.csv なら 2211 を入力。
    `,
  });

  execSync(`ts-node src/writeTotalCount.ts ${targetYearMonth}`, {
    stdio: 'inherit',
  });
};

writeTotal();
