const cheerio = require('cheerio')
const request = require('superagent')
const fs = require('fs')

let seasonURL = "http://www.espncricinfo.com/georgie-pie-super-smash-2015-16/engine/series/917513.html"
let data = []

request.get(seasonURL)
  .end((err, res) => {
    if (err) {console.error(err)}

    let results = []
    let $ = cheerio.load(res.text)
    let matchLinks = $('body').find('a.potMatchMenuLink')
    matchLinks.each((i, link) => {
      if (link.attribs.href.match(/\bmatch\b/)) {
        results.push(link.attribs.href)
      }
    })
    results.forEach((link) => {
      request.get('http://www.espncricinfo.com' + link)
        .end((err, res) => {
          if (err) {console.error(err)}

          // console.log(res.text)
          let $ = cheerio.load(res.text)
          let tableHtml = $('body').html()
          data.push(tableHtml)
          fs.writeFile('data.json', JSON.stringify(data), (err) => {
            if (err) {console.error(err)}

            console.log('file written')
          })
        })
    })
  })
