import d3 from 'd3'
import R from 'ramda'
import { reduceForUniquePlayers, getPlayersSeason } from './graph'

function createDonut(data, selectedPlayer) {
  const players = reduceForUniquePlayers(data)
  const playersData = players.map(player => getPlayersSeason(player, data))

  const margin = {top: 40, right: 40, bottom: 40, left: 40}
  const width = 960 - margin.left - margin.right
  const height = 500 - margin.top - margin.bottom

}

export {
  createDonut
}
