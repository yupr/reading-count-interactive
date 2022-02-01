const { readFile, outputArray } = require("./common");

//-----コマンドライン引数-------
// const program = require('commander')
// program.parse(process.argv);
// ファイルパスをprocess.args配列から取り出す
// const filePath = program.args[0]
//-----------------------

// 指定した月の多読数をカウント

const filePath = "./output/2201.csv";

//集計するfilePathの月を抽出
const getMonthFromFilePath = () => {
  let month = filePath.slice(filePath.length - 6, filePath.length - 4);
  if (month.slice(0, 1) === "0") {
    month = month.slice(1, 2);
  }
  return month;
};

//オブジェクトに変換後、countを集計
const getTotalCount = async () => {
  const month = getMonthFromFilePath();
  const file = await readFile(filePath, { isCreate: false });

  if (file) {
    const result = await outputArray(file);
    let totalMonth = 0;
    for (let i = 0; i < result.length; i++) {
      const wordCount = Number(result[i].count);
      totalMonth += wordCount;
    }
    console.log(month + "月合計:", totalMonth);
    return {
      monthCount: Number(totalMonth),
      month: month,
    };
  }
};
exports.getTotalCount = getTotalCount();
