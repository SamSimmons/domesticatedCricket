const fs = require('fs')
const R = require('ramda')

export function doesNotHaveBracket(str) {
  return (!str.includes('(')  )
}

export function isNotWierdSpace(str) {
  return !(str === ' ')
}

export function breakSeasonIntoChunks (season) {
  return season.map((game) => {
    let filteredBowling = game.bowling.filter((x) => {
      return isNotWierdSpace(x) && doesNotHaveBracket(x)
    })
    return ({
      link: game.link,
      batting: R.splitEvery(8, game.batting).map(createBattingObject),
      bowling: R.splitEvery(6, filteredBowling).map(createBowlingObject)
    })
  })
}

export function createBattingObject(chunk) {
  if (chunk.length === 8){
    return {
      batsman: chunk[0],
      dismissal: chunk[1],
      runs: chunk[2],
      minutes: chunk[3],
      balls: chunk[4],
      fours: chunk[5],
      sixes: chunk[6],
      strikeRate: chunk[7]
    }
  }
  return {}
}

export function createBowlingObject(chunk) {
  if (chunk.length === 6){
    return {
      bowler: chunk[0],
      overs: chunk[1],
      maidens: chunk[2],
      runs: chunk[3],
      wickets: chunk[4],
      economy: chunk[5]
    }
  }
  return {}
}

fs.readFile('season.json', (err, data) => {
  if (err) {console.error(err)}
  data = JSON.parse(data)
  let structuredData = breakSeasonIntoChunks(data)
  // fs.writeFile('../data/2014.json', JSON.stringify(structuredData), (err) => {
  //   if (err) {console.error(err)}
  // })

})
