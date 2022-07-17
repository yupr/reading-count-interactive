import fs from 'fs/promises';
import { stringify } from 'csv-stringify';
import parse from 'csv-parse';

//ファイルが作成されているかチェック
export const readFile = async (filePath) => {
  try {
    const file = await fs.readFile(filePath);
    return file;
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('読み込む対象のファイルが存在しない。');
    } else {
      console.log('エラー:', err);
    }
    return false;
  }
};

//csvを配列に変換
export const parseCsvToArray = (file) => {
  return new Promise((resolve, reject) => {
    parse(
      file,
      {
        columns: true,
      },
      (err, output) => {
        if (err) {
          console.log('CSVファイルを配列に変換できませんでした。');
          console.log('エラー:', err);
          reject(err);
        }
        resolve(output);
      }
    );
  });
};

//配列をcsvに変換
export const outputCsv = (data) => {
  return new Promise((resolve, reject) => {
    try {
      stringify(
        data,
        {
          header: true,
        },
        (err, output) => {
          resolve(output);
        }
      );
    } catch (err) {
      console.log('配列をCSVファイルに変換できませんでした。');
      console.log('エラー:', err);
    }
  });
};
