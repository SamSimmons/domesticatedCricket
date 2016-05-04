const data = require('../../data/2014.json')

let auckland = data.filter((game) => {
  return (game.home === "Auckland" || game.away === "Auckland")
})
function filterTeam(team) {
  return data.filter(game => game.home === team || game.away === team)
}

console.log(filterTeam("Wellington"))
