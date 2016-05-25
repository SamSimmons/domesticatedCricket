import d3 from 'd3'
import R from 'ramda'

function createBar(data) {
  console.log(data)

  const width = 500
  const height = 500

  let color = [
    'tomato',
    'steelblue'
  ]

  const svg = d3.select('.search-placeholder').append('svg')
    .attr({
      'width': width,
      'height': height
    })
    .style('background-color', 'bisque')

console.log(d3.select('.search-placeholder'))

}

export {
  createBar
}
