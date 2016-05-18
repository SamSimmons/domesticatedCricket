import d3 from 'd3'
import R from 'ramda'

function reduceForUniquePlayers(games){
  return R.compose(R.uniq, R.map(x => x.batsman), R.flatten)(games)
}

function plotData(name, data) {
  return data.map(game => {
    return game.filter(entry => (name === entry.batsman))
  }).reduce((a,b) => a.concat(b))
}


function createLineGraph(data, selectedPlayer){

  function drawLine (data) {
    if (data[0].batsman === selectedPlayer) {
      svg.append('path')
        .attr({
          d: line(data),
          'stroke': 'steelblue',
          'stroke-width': 5,
          'fill': 'none',
          'class': 'selectedPlayer',
          'id': data[0].batsman
        });

      svg.append("text")
        .attr("x", width - 6)
        .attr("y", height - 6)
        .style("text-anchor", "end")
        .text(selectedPlayer)

    } else {
      svg.append('path')
        .attr({
          d: line(data),
          'stroke': 'grey',
          'stroke-width': 3,
          'fill': 'none',
          'id': data[0].batsman
        });
      }
    }

  const players = reduceForUniquePlayers(data)

  const margin = {top: 40, right: 40, bottom: 40, left: 40}
  const width = 960 - margin.left - margin.right
  const height = 500 - margin.top - margin.bottom

  const x = d3.scale.linear().range([0, width])
  const y = d3.scale.linear().range([height, 0])

  x.domain([0, 15])
  y.domain([0, 100])

  const xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')

  const yAxis = d3.svg.axis()
    .scale(y)
    .ticks(5)
    .orient('left')

  const line = d3.svg.line()
    .interpolate('linear')
    .x((d, i) => (width / data.length) * i)
    .y(d => height - d.runs)

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

    players.forEach(player => drawLine(plotData(player, data)))

}

export {
  createLineGraph,
  reduceForUniquePlayers,
  plotData
}
