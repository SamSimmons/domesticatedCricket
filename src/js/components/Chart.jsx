import React, { Component } from 'react'
import d3 from 'd3'
import R from 'ramda'

export default class Chart extends Component {

  componentDidMount() {
    this.createLineGraph(this.plotData(this.props.selectedPlayer))
  }

// TODO use find here and find the player data and return it if it matches
  plotData(name) {
    return this.props.data.map(game => {
      return game.filter(entry => (name === entry.batsman))
    }).reduce((a,b) => a.concat(b))
  }

  createLineGraph(data){
    console.log(data)
    const svg = d3.select('.chart').append('svg')
      .attr({
        width: '800px',
        height: '500px'
      })

    const mapLine = d3.svg.line()
      .x((d, i) => (800 / data.length) * i)
      .y(d => 500 - d.runs)
      .interpolate('linear')

    const vis = svg.append('path')
      .attr({
        d: mapLine(data),
        "stroke": "steelblue",
        "stroke-width": 2,
        "fill": "none"
      })
  }


  updateGraph(){
    d3.select('svg').remove()
    this.createLineGraph(this.plotData(this.props.selectedPlayer))
  }


  render() {
    this.updateGraph()
    return (
      <div className="chart">

      </div>
    )
  }
}
