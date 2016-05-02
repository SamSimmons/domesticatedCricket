const cheerio = require('cheerio')
const fs = require('fs')
const R = require('ramda')

fs.readFile('season.json', (err, data) => {
  if (err) {console.error(err)}
  data = JSON.parse(data)
  let mapped = data.map((game) => {
    console.log(R.splitEvery(8, game.batting))
    return {
      link: game.link,
      batting: R.splitEvery(8, game.batting),
      bowling: R.splitWhen(R.equals(' '), game.bowling)
    }
    // game.batting = R.splitEvery(8, game.batting)
    // game.bowling = R.splitWhen(R.equals(' '), game.bowling)
  })
  console.log(mapped[0].batting)

})
