const data = require('../../data/2014.json')

let auckland = data.filter((game) => {
  return (game.home === "Auckland" || game.away === "Auckland")
})

console.log(auckland[2].batting)
