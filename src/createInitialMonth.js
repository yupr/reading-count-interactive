const fs = require("fs").promises;
const { isFileExist, outputCsv } = require("./common");

const filePath = "./output/2111.csv";
const initialMonth = []

//作成月の日付と初期値が入力された配列オブジェクトを作成
const createInitialMonth = () => {
  for (let i = 0; i < 31; i++) {
    //作成したい年月にセット
    initialMonth.push({ date: `${211101 + i}` , count: 0 });
  }
  return;
};

//変換されたcsvを新規ファイルで作成
const createNewFile = async () => {
  const isFile = await isFileExist(filePath);

  //ファイルが存在しなかったら新規作成
  if (!isFile) {
    createInitialMonth();
    const output = await outputCsv(initialMonth);
    if (output) {
      //書き出したいファイル名を指定
      await fs.writeFile(filePath, output);
    }
  }
};
createNewFile();
