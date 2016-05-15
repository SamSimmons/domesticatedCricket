import React, { Component } from 'react'
import d3 from 'd3'
import R from 'ramda'

export default class Chart extends Component {
  constructor(props) {
    super(props)
    // this.createLineGraph()
  }

  componentDidMount() {
    let data = [
      {game: 0, runs: 2},
      {game: 1, runs: 15},
      {game: 2, runs: 80},
      {game: 3, runs: 60}
    ]
    let nicol = this.plotData("RJ Nicol")
    console.log(nicol)
    this.createLineGraph(data)
  }
// TODO use find here and find the player data and return it if it matches
  plotData(name) {
    return this.props.data.map(game => {
      return game.filter(entry => (name === entry.batsman))
    }).reduce((a,b) => a.concat(b))
  }

  createLineGraph(data){
    const margin = {top: 20, right: 20, bottom: 30, left: 50}
    const width = 960 - margin.left - margin.right
    const height = 500 - margin.top - margin.bottom

    let x = d3.scale.linear()
        .range([0, width])

    let y = d3.scale.linear()
        .range([height, 0])

    let xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")

    let yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")

    let line = d3.svg.line()
      .x(function(d) { return x(d.game); })
      .y(function(d) { return y(d.runs); })


    let svg = d3.select(".chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    x.domain(d3.extent(data, function(d) { return d.game; }))
    y.domain(d3.extent(data, function(d) { return d.runs; }))

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)



  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);

  }

  render() {
    // console.log('props', this.props)
    return (
      <div className="chart">

      </div>
    )
  }
}
