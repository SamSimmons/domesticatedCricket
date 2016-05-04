
export function filterTeam(team, collection) {
  return collection.filter(game => game.home === team || game.away === team).map(game => {
    if (game.batting.teamOne.name === team){
      return game.batting.teamOne.data
    } else if (game.batting.teamTwo.name === team) {
      return game.batting.teamTwo.data
    }
  }).filter(x => x !== undefined)
}
