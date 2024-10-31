import { dailyCount, monthlyTotal } from './../type';
import { stringify } from 'csv-stringify';
import { parse } from 'csv-parse';

// csvを配列に変換
export const parseCsvToArray = (file: Buffer): Promise<[]> => {
  return new Promise((resolve, reject) => {
    parse(
      file,
      {
        columns: true,
      },
      (err, output) => {
        if (err) {
          console.error('CSVを配列に変換できませんでした。');
          reject(err);
        }
        resolve(output);
      },
    );
  });
};

// 配列をcsvに変換
export const outputCsv = (
  data: dailyCount[] | monthlyTotal[],
): Promise<string> => {
  return new Promise((resolve, reject) => {
    stringify(
      data,
      {
        header: true,
      },
      (err, output) => {
        if (err) {
          console.error('配列をCSVに変換できませんでした。');
          reject(err);
        }
        resolve(output);
      },
    );
  });
};
