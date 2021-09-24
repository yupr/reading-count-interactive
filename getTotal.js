const fs = require('fs');
const parse = require('csv-parse')
//同期処理の場合: const parse = require('csv-parse/lib/sync')

//csvファイルを配列オブジェクトに変換
const outputArray = () => {
  return new Promise((resolve, reject) =>{
    const fileData = fs.readFileSync('./2110.csv');
    parse(fileData, {
      columns: true,
    }, (err, output) =>{
      if(err){
        reject(err)
        return;
      }
      resolve(output)
    })
  })
}

//変換されたオブジェクトからcountのtotalを集計
const getTotalCount = async() =>{
  const result = await outputArray();
  let totalCount = 0;
  for(let i=0; i<result.length; i++){
    const wordCount = Number(result[i].count)
    totalCount += wordCount;
  }
  console.log('計:', totalCount)  
}
getTotalCount()
