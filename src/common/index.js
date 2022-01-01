const fs = require("fs").promises;
const stringify = require("csv-stringify");
const parse = require("csv-parse");

//ファイルが作成されているかチェック
exports.readFile = async (filePath, { isCreate, isUpdate }) => {
  try {
    const file = await fs.readFile(filePath);
    if (file) {
      if (isCreate) {
        console.log(
          "fileが既に存在しているため、新規作成したい場合は filePath を修正してください。"
        );
      } else if (isUpdate) {
        console.log("fileが見つかりましたのでアップデートします。");
      }
    }

    return file;
  } catch (err) {
    if (err.code === "ENOENT") {
      if (isCreate) {
        console.log("fileが見つからないので新規作成します。");
      } else {
        console.log("fileが見つかりません。filePathを確認ください。");
      }
      return false;
    } else {
      throw new Error(err);
    }
  }
};

//csvを配列に変換
exports.outputArray = (file) => {
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
      return;
    }
  });
};

//配列をcsvに変換
exports.outputCsv = (data) => {
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
      return;
    }
  });
};
