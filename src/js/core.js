
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
  let returnr = data.map(game =>{
      let a = game.batting.teamOne.data.filter(playerGame => (name === playerGame.batsman))
      let b = game.batting.teamTwo.data.filter(playerGame => (name === playerGame.batsman))
      return a.concat(b)
  }).reduce((a,b) => a.concat(b), [])
  console.log(returnr)
  return returnr
}
export {
  filterTeam,
  getPlayersSeason,
  reduceForUniquePlayers,
  gatherPlayerData
}
