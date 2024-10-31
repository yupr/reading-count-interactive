import { confirm } from '@inquirer/prompts';
import * as fs from 'fs/promises';
import * as path from 'path';

const backupDirectory = path.join(
  process.env.HOME ?? '',
  'Documents/backup/reading-count/',
);

const backup = async () => {
  if (!backupDirectory) {
    console.error('backup先のディレクトリが見つかりません。');
    return;
  }

  const answer = await confirm({
    message: 'バックアップを作成します。よろしいですか？',
    default: false, // デフォルトではNoを選択
  });

  if (answer) {
    try {
      await fs.cp('Archive', path.join(backupDirectory, 'Archive'), {
        recursive: true,
      });
      await fs.cp('Output', path.join(backupDirectory, 'Output'), {
        recursive: true,
      });
      console.log('バックアップが完了しました。');
    } catch (err) {
      console.error('バックアップに失敗しました:', err);
    }
  } else {
    console.log('バックアップをキャンセルしました。');
  }
};

backup();
