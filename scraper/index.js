const cheerio = require('cheerio')
const request = require('superagent')
const fs = require('fs')

let seasonURL = "http://www.espncricinfo.com/georgie-pie-super-smash-2015-16/engine/series/917513.html"
let season = []
let count = 0


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
    results.forEach((link, i) => {

      request.get('http://www.espncricinfo.com' + link)
        .end((err, res) => {
          if (err) {console.error(err)}


          let $ = cheerio.load(res.text)
          let teams = $('.teamLink').toArray().reduce((a, b) => a.concat(b.children), []).map(x => x.data)
          let firstTeam = $('.th-innings-heading').toArray()
          if(firstTeam.length > 0){
            firstTeam = firstTeam[0].children[0].data.replace(/innings/i, "").trim()
          } else {
            firstTeam = null
          }
          let bowlingTables = $('.bowling-table').find('td').toArray()
          let battingTables = $('.batting-table').find('td').toArray()
          let bowlingResults = []
          let battingResults = []
          grabData(bowlingTables, bowlingResults)
          grabData(battingTables, battingResults)
          let gameObj = {
            teams: teams,
            battingFirst: firstTeam,
            link: link,
            batting: battingResults,
            bowling: bowlingResults
          }
          season.push(gameObj)
          saveData()

        })
    })
  })

  function findInnerData(elt) {
    if (!elt.children) {
      return null
    }
    if (elt.name === 'td') {
      return elt.children
    }
    findInnerData(elt.children)
  }

  function saveData() {
    count ++
    console.log(count)
    if(count === 33) {
      fs.writeFile('season.json', JSON.stringify(season), (err) => {
        if(err) {console.error(err)}
        console.log('._saved_.')
      })
    }
  }


  function grabData(array, target) {
    array.forEach((tableData) => {
      if (tableData.children.length > 1) {
        if (tableData.children[0].name === 'a'){
          target.push(tableData.children[0].children[0].data)
        }
      } else if (tableData.children.length > 0) {
          if (tableData.children[0].name === 'a' || tableData.children[0].name === 'b'){
            target.push(tableData.children[0].children[0].data)
          } else {
            if (tableData.children[0].type === 'text'){
              target.push(tableData.children[0].data)
            }
          }
        }
    })
  }
