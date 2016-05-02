const cheerio = require('cheerio')
const fs = require('fs')
const _ = require('lodash')

let results = []
fs.readFile('season.json', (err, data) => {
  if (err) {console.error(err)}
  data = JSON.parse(data)
  console.log(data.length)

})
