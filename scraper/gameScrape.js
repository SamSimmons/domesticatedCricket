const cheerio = require('cheerio')
const fs = require('fs')
const _ = require('lodash')

let results = []
fs.readFile('data.json', (err, data) => {
  if (err) {console.error(err)}
  let $ = cheerio.load(data.toString())
  let rows = $('table').find('td').toArray()
  rows.forEach((tableData) => {
    if (tableData.children.length > 1) {
      if (tableData.children[0].name === 'a'){
        results.push(tableData.children[0].children[0].data)
      }
    } else if (tableData.children.length > 0) {
        if (tableData.children[0].name === 'a' || tableData.children[0].name === 'b'){
          results.push(tableData.children[0].children[0].data)
        } else {
          if (tableData.children[0].type === 'text'){
            results.push(tableData.children[0].data)
          }
        }
    }
  })
  console.log(results.length)
  results = results.filter(x => {
    if (x)
      return true
  })
  fs.writeFile('filteredData.json', JSON.stringify(results), (err) => {
    if (err) {console.error(err)}
    console.log('results have been written to file.')
  })
})
