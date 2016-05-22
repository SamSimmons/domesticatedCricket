import d3 from 'd3'
import R from 'ramda'
import { createScatterPlot } from './scatterPlot'
import { createDonut } from './donut'

function reduceForUniquePlayers(games){
  return R.compose(R.uniq, R.map(x => x.batsman), R.flatten)(games)
}

function findMaxSeasonRuns(data, players) {
  return players.map(player => getPlayersSeason(player, data)
    .reduce((a,b) => a + parseInt(b.runs), 0))
      .reduce((a, b) => R.max(a, b))
}

function findMaxAverage(data, players) {
  let playersMovingAverages = players.map(player => getRunsPer(getPlayersSeason(player, data)))
  let playersHighest = playersMovingAverages.map(x => x.reduce((a,b) => R.max(a, b.runs), 0))
  return playersHighest.reduce((a,b) => R.max(a, b))
}

function getPlayersSeason(name, data) {
  return data.map(game => {
    return game.filter(entry => (name === entry.batsman))
  }).reduce((a,b) => a.concat(b))
}

function getRunningTotals(data) {
  return data.map(x => {
    return {
      'batsman': x.batsman,
      'runs': parseInt(x.runs)
    }
  })
  .reduce((totals, current, i) => {
    totals.push({
      'batsman': current.batsman,
      'runs': totals[i - 1] ? current.runs + (totals[i - 1].runs) : current.runs
    })
    return totals
  }, [])
}

function getRunsPer(data) {
  return data.map((current, i) => {
    return {
      'batsman': current.batsman,
      'runs': R.mean(data.slice(0, i + 1).map(x => x.runs))
    }
  })
}

function createLineGraph(data, selectedPlayer, type = "totals"){
  function drawLine (data) {
      if (data.length < 1) {
        return
      }
      let possibleSelected = (selectedPlayer === data[0].batsman) ? 'selectedPlayer' : ''
      svg.append('path')
        .attr({
          d: line(data),
          'stroke': 'grey',
          'stroke-width': 5,
          'fill': 'none',
          'id': data[0].batsman,
          'class': possibleSelected
        })
    }

  const players = reduceForUniquePlayers(data)

  const margin = {top: 40, right: 40, bottom: 40, left: 40}
  const width = 960 - margin.left - margin.right
  const height = 500 - margin.top - margin.bottom

  const x = d3.scale.linear().range([0, width])
  const y = d3.scale.linear().range([height, 0])
  let max = findMaxSeasonRuns(data, players)
  if (type === 'runsPer') {
    max = findMaxAverage(data, players)
  }
  x.domain([0, data.length])
  y.domain([0, max])

  const xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')

  const yAxis = d3.svg.axis()
    .scale(y)
    .ticks(5)
    .orient('left')

  const line = d3.svg.line()
    .interpolate('monotone')
    .x((d, i) => x(i))
    .y(d => y(d.runs))

  const svg = d3.select('.chart').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.right +')')

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', 'translate(0,' + height + ')')
      .attr('stroke', "tomato")
      .attr('fill', 'none')
      .call(xAxis);

    svg.append('g')
      .attr('class', 'y-axis')
      .attr('stroke', 'tomato')
      .attr('fill', 'none')
      // .attr('transform', 'translate(' + width + ',0)')
      .call(yAxis);

    if (type === 'runsPer'){
      players.forEach(player => drawLine(getRunsPer(getPlayersSeason(player, data))))
    } else {
      players.forEach(player => drawLine(getRunningTotals(getPlayersSeason(player, data))))
    }
}

export {
  createLineGraph,
  reduceForUniquePlayers,
  getPlayersSeason,
  findMaxSeasonRuns,
  findMaxAverage,
  getRunsPer,
  getRunningTotals
}
