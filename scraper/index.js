let cheerio = require('cheerio')
let request = require('superagent')

let seasonURL = "http://www.espncricinfo.com/georgie-pie-super-smash-2015-16/engine/series/917513.html"

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
    console.log(results)
  })
