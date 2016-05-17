const fs = require('fs')
const R = require('ramda')

export function doesNotHaveBracket(str) {
  return (!str.includes('(')  )
}

export function isNotWierdSpace(str) {
  return !(str === ' ')
}
//refactor this because the chaining got out of hand on line 17
export function breakSeasonIntoChunks (season) {
  return season.map((game) => {
    let filteredBowling = game.bowling.filter((x) => {
      return isNotWierdSpace(x) && doesNotHaveBracket(x)
    })
    let battingArray = removeExtras(splitInnings(R.splitEvery(8, game.batting).map(createBattingObject)))
    let battingSecond = game.teams.filter(x => (x !== game.battingFirst))[0]
    return ({
      home: game.teams[0],
      away: game.teams[1],
      link: game.link,
      batting: {
        teamOne: {
          name: game.battingFirst,
          data: battingArray[0],
        },
        teamTwo: {
          name: battingSecond,
          data: battingArray[1]
        }
      },
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

export function splitInnings(list) {
  return R.splitWhen((x) => (x.batsman === 'Extras'), list)
}

export function removeExtras(multiArray) {
  return multiArray.map(list => list.filter(x => x.batsman !== "Extras"))
}

fs.readFile('season.json', (err, data) => {
  if (err) {console.error(err)}
  data = JSON.parse(data)
  let structuredData = breakSeasonIntoChunks(data)
  fs.writeFile('../data/2014.json', JSON.stringify(structuredData), (err) => {
    if (err) {console.error(err)}
  })

})
