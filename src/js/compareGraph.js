import d3 from 'd3'
import R from 'ramda'

function round (num) {return num.toFixed(2)}



function createComparison(data, max, node) {
  const width = 300
  const height = 50
  const midHeight = 25
  let color = [
    'tomato',
    'steelblue'
  ]
  if (data[0] > data[1]) {
    color[0] = 'springgreen'
  }

  const x = d3.scale.linear().range([0, width])
  const y = d3.scale.linear().range([height, 0])

  x.domain([0, max])
  y.domain([0, data.length])

  const svg = d3.select('.' + node).append('svg')
    .attr('width', width)
    .attr('height', height)
    svg.append('line')
      .attr({
        'x1':0,
        'x2':width,
        'y1': height / 2,
        'y2': height / 2
      })
      .style('stroke-width', 2)
      .style("stroke", 'lightgrey')

  let bar = svg.selectAll('g')
    .data(data)
    .enter().append('g')
    .attr("transform", (d, i) => "translate(0," + i * midHeight + ")")

  bar.append('circle')
    .attr("cx", x)
    .attr("cy", midHeight / 2)
    .attr('r', 8)
    .style('fill', (d, i) => color[i])
    .style('stroke', 'grey')

  svg.append('text')
    .attr('class', 'label')
    .text('0')
    .attr('text-anchor', 'start')
    .attr('transform', 'translate('+ 0 + ',' + height / 2 + ')')
  svg.append('text')
    .attr('class', 'label')
    .text(round(max))
    .attr('text-anchor', 'end')
    .attr('transform', 'translate('+ width + ',' + height / 2 + ')')

}

export {
  createComparison
}
