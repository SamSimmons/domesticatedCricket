import d3 from 'd3'
import R from 'ramda'
import { reduceForUniquePlayers, getPlayersSeason, getPlayerTotals } from './core'

function createDonut(data, selectedPlayer) {
  const players = reduceForUniquePlayers(data)
  const playersData = players.map(player => getPlayersSeason(player, data))
  const playerTotals = playersData.map(getPlayerTotals)
  console.log(playerTotals)

  const margin = {top: 40, right: 40, bottom: 40, left: 40}
  const width = 960 - margin.left - margin.right
  const height = 500 - margin.top - margin.bottom
  const radius = Math.min(width, height) / 2

  const color = [
    'steelblue',
    'olivedrab',
    'tomato',
    'cadetblue',
    'darkcyan',
    'darkslategrey',
    'deeppink',
    'gold',
    'indianred',
    'lightseagreen',
    'lightsalmon',
    'lightcoral',
    'mediumspringgreen',
    'orangered',
    'peru',
    'royalblue',
    'palevioletred',
    'springgreen'
  ]

  const arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 70)

  const pie = d3.layout.pie()
    .sort(null)
    .value(d => d.runs)

  const svg = d3.select('.chart').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', 'translate(' + width / 2  + ',' + height / 2 + ')' )

  let g = svg.selectAll('.arc')
      .data(pie(playerTotals))
    .enter().append('g')
      .attr('class', 'arc')

  g.append('path')
    .attr('d', arc)
    .style('fill', (d, i) => color[i] )

  g.append('text')
    .attr('transform', (d) => 'translate(' + arc.centroid(d) + ')')
    .attr('dy', '.35em')
    .text(d => d.data.batsman)




}

export {
  createDonut
}
