import d3 from 'd3'
import R from 'ramda'
import { reduceForUniquePlayers, getPlayersSeason } from './graph'

function plotData(totalRuns, boundaries) {
  return totalRuns.map((obj, i) => {
    return R.merge(obj, boundaries[i])
  })
}

function getTotalRuns(season) {
  return season.map(playerData => {
    return {
      "batsman": playerData[0].batsman,
      "totalRuns": playerData.reduce((a, b) => a + parseInt(b.runs), 0)
    }
  })
}

function getRunsFromBoundaries(season) {
  return season.map(playerData => {
    let fours = playerData.reduce((a, b) => a + parseInt(b.fours), 0)
    let sixes = playerData.reduce((a, b) => a + parseInt(b.sixes), 0)
    return {
      "batsman": playerData[0].batsman,
      "totalFours": fours,
      "totalSixes": sixes,
      "runsFromBoundaries": (fours * 4) + (sixes * 6)
    }
  })
}

function createScatterPlot(data, selectedPlayer){
  const players = reduceForUniquePlayers(data)
  const playersData = players.map(player => getPlayersSeason(player, data))
  const totalRuns = getTotalRuns(playersData)
  const boundariesTotal = getRunsFromBoundaries(playersData)
  const graphReadyData = plotData(totalRuns, boundariesTotal)

  const margin = {top: 40, right: 40, bottom: 40, left: 40}
  const width = 960 - margin.left - margin.right
  const height = 500 - margin.top - margin.bottom


  const xMax = graphReadyData.reduce((a, b) => R.max(a, b.totalRuns), 0)
  console.log('max', xMax)
  console.log(graphReadyData)
  const yMax = graphReadyData.reduce((a, b) => R.max(a, b.runsFromBoundaries), 0)

  let xValue = (d) => d.totalRuns
  let xScale = d3.scale.linear().range([0, width])
  let xMap = (d) => xScale(xValue(d))
  let xAxis = d3.svg.axis().scale(xScale).orient('bottom')

  let yValue = (d) => d.runsFromBoundaries
  let yScale = d3.scale.linear().range([height, 0])
  let yMap = (d) => yScale(yValue(d))
  let yAxis = d3.svg.axis().scale(yScale).orient('left')


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

      svg.selectAll('.dot')
        .data(graphReadyData).enter()
        .append('circle')
          .attr({
            'class': '',
            'r': 5,
            'cx': xMap,
            'cy': yMap,
            'id': (d) => d.batsman
          })

}

export {
  createScatterPlot
}
