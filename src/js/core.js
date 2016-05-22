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

function getPlayersSeason(name, data) {
  return data.map(game => {
    return game.filter(entry => (name === entry.batsman))
  }).reduce((a,b) => a.concat(b))
}

function gatherPlayerData(name, data) {
  return data.map(game =>{
      let a = game.batting.teamOne.data.filter(playerGame => (name === playerGame.batsman))
      let b = game.batting.teamTwo.data.filter(playerGame => (name === playerGame.batsman))
      return a.concat(b)
  }).reduce((a,b) => a.concat(b), [])
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

function getPlayerTotals(season) {
  return season.reduce((a, b) => {
    return {
      'balls': parseFloat(a.balls) + parseFloat(b.balls),
      'batsman': b.batsman,
      'fours': parseFloat(a.fours) + parseFloat(b.fours),
      'sixes': parseFloat(a.sixes) + parseFloat(b.sixes),
      'runs': parseFloat(a.runs) + parseFloat(b.runs)
    }
  })
}

export {
  filterTeam,
  getPlayersSeason,
  reduceForUniquePlayers,
  gatherPlayerData,
  getPlayerTotals,
  getTeamTotals
}
