import fs from "fs/promises";
import stringify from "csv-stringify";
import parse from "csv-parse";

//ファイルが作成されているかチェック
export const readFile = async (filePath) => {
  try {
    const file = await fs.readFile(filePath);
    return file;
  } catch (err) {
    console.log("err", err);
    return false;
  }
};

//csvを配列に変換
export const outputArray = (file) => {
  return new Promise((resolve, reject) => {
    try {
      parse(
        file,
        {
          columns: true,
        },
        (err, output) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(output);
        }
      );
    } catch (err) {
      console.log("CSVファイルを配列に変換できませんでした。", err);
    }
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
          if (err) {
            reject(err);
            return;
          }
          resolve(output);
        }
      );
    } catch (err) {
      console.log("配列をCSVファイルに変換できませんでした。", err);
    }
  });
};
