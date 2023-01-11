import { dailyCount, monthlyTotal } from './../type';
import fs from 'fs/promises';
import { stringify } from 'csv-stringify';
import { parse } from 'csv-parse';

// ファイルが作成されているかチェック
export const readFile = async (filePath: string): Promise<Buffer | false> => {
  try {
    const file = await fs.readFile(filePath);
    return file;
  } catch (err) {
    return false;
  }
};

// csvを配列に変換
export const parseCsvToArray = (file: Buffer | false): Promise<[]> => {
  return new Promise((resolve, reject) => {
    if (file) {
      parse(
        file,
        {
          columns: true,
        },
        (err, output) => {
          if (err) {
            console.error('CSVファイルを配列に変換できませんでした。', err);
            reject(err);
          }
          resolve(output);
        }
      );
    } else {
      console.error('file not found');
    }
  });
};

// 配列をcsvに変換
export const outputCsv = (
  data: dailyCount[] | monthlyTotal[]
): Promise<string> => {
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
      console.error('配列をCSVファイルに変換できませんでした。', err);
      reject(err);
    }
  });
};
