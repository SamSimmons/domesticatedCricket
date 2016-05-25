import React, { Component } from 'react'
import d3 from 'd3'

export default class Colorchart extends Component {
  createPie(data) {
    const graphData = [data, 100 - data]

    const width = 150
    const height = 150
    const radius = Math.min(width, height) / 2

    const arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(0)

    const pie = d3.layout.pie()
      .sort(null)


    let color = [
      'tomato',
      'steelblue'
    ]
    if (data[0] > data[1]) {
      color[0] = 'springgreen'
    }

    const svg = d3.select('.pie').append('svg')
      .attr('width', width)
      .attr('height', height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

    const g = svg.selectAll(".arc")
      .data(pie(graphData))
      .enter().append("g")
      .attr("class", "arc")

    g.append("path")
      .attr("d", arc)
      .style("fill", (d, i) => color[i])


  }

  updateGraph(){
    d3.select('.pie svg').remove()
    this.createPie(this.props.percent)
  }

  componentDidMount() {
    this.updateGraph()
  }

  render() {
    this.updateGraph()
    return (
      <div className="pie">

      </div>
    )
  }
}
