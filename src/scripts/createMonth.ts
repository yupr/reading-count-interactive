import { input } from '@inquirer/prompts';
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import dedent from 'ts-dedent';
import { DAILY_COUNT_DIRECTORY } from '../constants';

export const createMonth = async () => {
  const isDirectory = existsSync(DAILY_COUNT_DIRECTORY);
  if (!isDirectory) {
    console.error(
      'output ディレクトリがルートに存在しないため作成してください。',
    );
    return;
  }

  const answer = await input({
    message: dedent`
    作成したい日付を例に倣って入力してください
    例: 2022年7月分 を作成したい場合、2207 を入力。
    `,
  });

  execSync(`ts-node src/createInitialMonth.ts ${answer}`, {
    stdio: 'inherit',
  });
};

createMonth();
