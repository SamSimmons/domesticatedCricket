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

function reduceForUniqueTeams() {
  
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

//if the first result is true, then start the out count with one, otherwise zero. Then increment for every true value to get the total times a player was given out in a season.
function getPlayerTotals(season) {
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

function fixOuts(playerGame) {
  playerGame.out = (playerGame.dismissal.trim() !== 'not out')
  return playerGame
}

export {
  filterTeam,
  getPlayersSeason,
  reduceForUniquePlayers,
  getPlayerData,
  getPlayerTotals,
  getTeamTotals
}
