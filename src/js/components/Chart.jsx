import React, { Component } from 'react'
import d3 from 'd3'

export default class Chart extends Component {
  constructor(props) {
    super(props)
    this.createLineGraph()
  }

  createLineGraph(){
    console.log('createLine')
    let x = d3.scale.linear().range([0, 1000])
    let y = d3.scale.linear().range([0, 500])

    let xAxis = d3.svg.axis().scale(x)
      .orient('bottom').ticks(this.props.data.length)

    let yAxis = d3.scg.axis().scale(y)
      .orient('left').ticks(5)
  }

  render() {
    console.log('props', this.props)
    return (
      <div className="chart">
        <svg width='1000' height='500'></svg>
      </div>
    )
  }
}
