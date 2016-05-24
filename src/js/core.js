import R from 'ramda'

function filterTeam(team, collection) {
  return collection.filter(game => game.home === team || game.away === team).map(game => {
    if (game.batting.teamOne.name === team){
      return game.batting.teamOne.data
    } else if (game.batting.teamTwo.name === team) {
      return game.batting.teamTwo.data
    }
  }).filter(x => x !== undefined)
}

function reduceForUniquePlayers(games){
  return R.compose(R.uniq, R.map(x => x.batsman), R.flatten)(games)
}

function fixSingleGames(arr) {
  let game = arr[0]
  return {
    'balls': parseFloat(game.balls),
    'batsman': game.batsman,
    'fours': parseFloat(game.fours),
    'sixes': parseFloat(game.sixes),
    'runs': parseFloat(game.runs),
    'out': game.out === true ? 1 : 0
  }
}

function reduceSeasonToAverages(data) {
  const dataMappedToPlayers = mapDataToPlayers(data)
  const playerAverages = dataMappedToPlayers.map(x => {
    return x.map(fixOuts)
  }).map(getPlayerTotals).map(x => {
    let ave = x.out < 1 ? x.runs : x.runs / x.out
    return Object.assign(x, { 'average': ave } )
  })
  return playerAverages
}

function getSeasonTotals(data) {
  return flattenAndRemoveEmptyGames(data).map(fixOuts).reduce((a, b, i) => {
    if (typeof a.out === 'boolean') {
      a.out = (a.out === true) ? 1 : 0
    }
    return {
      'balls': parseFloat(a.balls) + parseFloat(b.balls),
      'fours': parseFloat(a.fours) + parseFloat(b.fours),
      'sixes': parseFloat(a.sixes) + parseFloat(b.sixes),
      'runs': parseFloat(a.runs) + parseFloat(b.runs),
      'out': b.out === true ? a.out + 1 : a.out,
      'count' : i
    }
  })
}

 function getSeasonAverage(players) {
  let average = {
    "runs": [],
    "balls": [],
    "fours": [],
    "sixes": [],
    "out": []
  }
  players.forEach(player => {
    average.runs.push(player.runs)
    average.balls.push(player.balls)
    average.fours.push(player.fours)
    average.sixes.push(player.sixes)
    average.out.push(player.out)
  })
  return {
    "runs": Math.round(R.mean(average.runs)),
    "balls": Math.round(R.mean(average.balls)),
    "fours": Math.round(R.mean(average.fours)),
    "sixes": Math.round(R.mean(average.sixes)),
    "out": Math.round(R.mean(average.out))
  }
}

function flattenAndRemoveEmptyGames(data){
  return R.flatten(data.map(game => {
    if (game.batting.teamOne.data.length < 1) {
      return null
    }
    let a = game.batting.teamOne.data
    let b = game.batting.teamTwo.data
    return a.concat(b)
  }).filter(x => (x !== null)))
}


function getPlayersSeason(name, data) {
  return data.map(game => {
    return game.filter(entry => (name === entry.batsman))
  }).reduce((a,b) => a.concat(b))
}

function getPlayerData(name, data) {
  return data.map(game =>{
      let a = game.batting.teamOne.data.filter(playerGame => (name === playerGame.batsman))
      let b = game.batting.teamTwo.data.filter(playerGame => (name === playerGame.batsman))
      return a.concat(b)
  }).reduce((a,b) => a.concat(b), []).map(fixOuts)
}

function teamReducer (a,b) {
  return {
    'balls': parseFloat(a.balls) + parseFloat(b.balls),
    'fours': parseFloat(a.fours) + parseFloat(b.fours),
    'sixes': parseFloat(a.sixes) + parseFloat(b.sixes),
    'runs': parseFloat(a.runs) + parseFloat(b.runs)
  }
}

function getTeamTotals(team, data) {
  return filterTeam(team, data).map(game => {
    if ( game.length === 0) {
      return null
    }
    return game.reduce(teamReducer)
  }).filter(x => x !== null).reduce(teamReducer)
}

//if argument length is one, the player only played a single innings, and the reducer function won't work so it goes through fix, single games
//if the first result is true, then start the out count with one, otherwise zero. Then increment for every true value to get the total times a player was given out in a season.
function getPlayerTotals(season) {
  if (season.length === 1) {
    return fixSingleGames(season)
  }
  return season.reduce((a, b) => {
    if (typeof a.out === 'boolean') {
      a.out = (a.out === true) ? 1 : 0
    }
    return {
      'balls': parseFloat(a.balls) + parseFloat(b.balls),
      'batsman': b.batsman,
      'fours': parseFloat(a.fours) + parseFloat(b.fours),
      'sixes': parseFloat(a.sixes) + parseFloat(b.sixes),
      'runs': parseFloat(a.runs) + parseFloat(b.runs),
      'out': b.out === true ? a.out + 1 : a.out
    }
  })
}

function getMaxes(playerAverages) {
  return playerAverages.reduce((a, b) => {
    return {
      'average': Math.max(a.average, b.average),
      'fours': Math.max(a.fours, b.fours),
      'balls': Math.max(a.balls, b.balls),
      'sixes': Math.max(a.sixes, b.sixes),
      'runs': Math.max(a.runs, b.runs),
      'out': Math.max(a.out, b.out)
    }
  }, {
    'average': 0,
    'balls': 0,
    'fours': 0,
    'sixes': 0,
    'runs': 0,
    'out': 0
  })
}

function fixOuts(playerGame) {
  playerGame.out = (playerGame.dismissal.trim() !== 'not out')
  return playerGame
}

function mapDataToPlayers(data) {
  const flatData = flattenAndRemoveEmptyGames(data)
  const allPlayerNames = reduceForUniquePlayers(flatData)
  const dataMappedToPlayers = allPlayerNames.map(playerName => {
    return flatData.filter(gameObj => (playerName === gameObj.batsman))
  })
  return dataMappedToPlayers
}

export {
  filterTeam,
  getPlayersSeason,
  reduceForUniquePlayers,
  getPlayerData,
  getPlayerTotals,
  getTeamTotals,
  getSeasonTotals,
  reduceSeasonToAverages,
  getSeasonAverage,
  getMaxes,
  mapDataToPlayers
}
