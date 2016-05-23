import d3 from 'd3'
import R from 'ramda'
import { reduceForUniquePlayers, getPlayersSeason, getPlayerTotals } from './core'

function createDonut(data, selectedPlayer) {
  const players = reduceForUniquePlayers(data)
  const playersData = players.map(player => getPlayersSeason(player, data))
  const playerTotals = playersData.map(getPlayerTotals)
  const graphReady = R.groupBy(x => {
    let runs = parseInt(x.runs)
    return runs < 50 ? 'other' : "data"
  }, playerTotals)

  const margin = {top: 40, right: 40, bottom: 40, left: 40}
  const width = 960
  const height = 500
  const radius = 200

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
    .attr('width', width)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', 'translate(' + width / 2  + ',' + height / 2 + ')' )

  let g = svg.selectAll('.arc')
      .data(pie(graphReady.data))
    .enter().append('g')
      .attr('class', 'arc')

  g.append('path')
    .attr('d', arc)
    .style('fill', (d, i) => color[i] )
    .attr('id', d => d.data.batsman)

  g.append('svg:text')
    .attr('transform', (d) => {
      let position = arc.centroid(d).map(x => x * 1.5)
      return 'translate(' + position + ')'
    })
    .attr('text-anchor', 'middle')
    .text(d => d.data.runs > 50 ? d.data.batsman: '')
}

export {
  createDonut
}
