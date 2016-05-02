const cheerio = require('cheerio')
const fs = require('fs')
const R = require('ramda')

function doesNotHaveBracket(str) {
  return (!str.includes('(')  )
}

function isNotEmptyString(str) {
  return !(str === ' ')
}

fs.readFile('season.json', (err, data) => {
  if (err) {console.error(err)}
  data = JSON.parse(data)
  let mapped = data.map((game) => {
    let filteredBowling = game.bowling.filter((x) => {
      return isNotEmptyString(x) && doesNotHaveBracket(x)
    })
    return ({
      link: game.link,
      batting: R.splitEvery(8, game.batting),
      bowling: R.splitEvery(6, filteredBowling)
    })
  })
   console.log( mapped[2])

})
