import React, { Component } from 'react'
import d3 from 'd3'
import R from 'ramda'
import { createLineGraph } from '../graph'

export default class Chart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      graph: 'totals'
    }
  }

  componentDidMount() {
    createLineGraph(this.props.data, this.props.selectedPlayer)
  }

  handleRunsPer() {
    this.setState({graph: "runsPer" })
    this.updateGraph()
  }

  handleTotals() {
    this.setState({graph: 'totals'})
    this.updateGraph()
  }

  updateGraph(){
    d3.select('svg').remove()
    createLineGraph(this.props.data, this.props.selectedPlayer, this.state.graph)
  }

  render() {
    this.updateGraph()
    return (
      <div className="chart-wrapper">
        <button onClick={this.handleTotals.bind(this)}>Total runs in season</button>
        <button onClick={this.handleRunsPer.bind(this)}>Runs per game</button>
        <div className="chart" onClick={this.props.handleClick.bind(this)}>
        </div>
      </div>
    )
  }
}
