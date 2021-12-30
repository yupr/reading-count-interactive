const fs = require("fs").promises;
const stringify = require("csv-stringify");
const parse = require("csv-parse");

//ファイルが作成されているかチェック
exports.isFileExist = async (filePath) => {
  try {
    const file = await fs.readFile(filePath);
    //ファイルがあれば、例外処理に移動
    if(file){
      throw new Error('file_is_Exist')
    }
  } catch (err) {
    if(err.message === 'file_is_Exist'){
      console.log('ファイルが既に存在しているため、作成したい場合は filePath を修正してください。')
      return true;
    }else{
      console.log('ファイルがないので、作成します。')
      return false;
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
