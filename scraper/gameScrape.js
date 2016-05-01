const cheerio = require('cheerio')
const fs = require('fs')
const _ = require('lodash')

let results = []
fs.readFile('data.json', (err, data) => {
  if (err) {console.error(err)}
  let $ = cheerio.load(data.toString())
  let rows = $('table').find('td').toArray()
  rows.forEach((tableData) => {
    if (tableData.children.length > 1 ) {
      if (tableData.children[0].name === 'a'){
        results.push(tableData.children[0].children[0].data)
      }
    } else if (tableData.children.length > 0) {
        results.push(tableData.children[0].data)
    }
  })
  console.log(results)
})
