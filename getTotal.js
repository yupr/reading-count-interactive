const fs = require('fs');
const parse = require('csv-parse/lib/sync')

const data = fs.readFileSync('./2110.csv');
const result = parse(data, {
  columns: true,
})
console.log('result', result)

let totalCount = 0;
for(let i=0; i<result.length; i++){
  const wordCount = Number(result[i].count)
  totalCount += wordCount;
}
console.log('totalCount', totalCount)
