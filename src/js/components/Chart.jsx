import React, { Component } from 'react'
import d3 from 'd3'
import R from 'ramda'
import { createLineGraph } from '../graph'
import { createScatterPlot } from '../scatterPlot'
import { createDonut } from '../donut'

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

  handleScatter() {
    this.setState({graph: 'scatter'})
    this.updateGraph()
  }

  handleDonut() {
    this.setState({graph: 'donut'})
    this.updateGraph()
  }

  isActive(button) {
    if (button === this.state.graph) {
      return "active"
    }
    return ""
  }

  updateGraph(){
    d3.select('svg').remove()
    switch (this.state.graph) {
      case('scatter'): {
        createScatterPlot(this.props.data, this.props.selectedPlayer)
        break
      }
      case('donut'): {
        createDonut(this.props.data, this.props.selectedPlayer, this.props.team)
        break
      }
      default:
        createLineGraph(this.props.data, this.props.selectedPlayer, this.state.graph)
    }
  }

  render() {
    this.updateGraph()
    return (
      <div className="chart-wrapper">
        <h3>{this.state.graph === 'donut' ? 'Player who scored more than fifty runs:' : 'Highlighted Player:' }</h3>
        <h1>{this.state.graph === 'donut' ? this.props.team : this.props.selectedPlayer}</h1>
        <div className="button-panel">
          <button className={this.isActive('totals')} onClick={this.handleTotals.bind(this)}>Total runs in season</button>
          <button className={this.isActive('runsPer')} onClick={this.handleRunsPer.bind(this)}>Runs per game</button>
          <button className={this.isActive('scatter')} onClick={this.handleScatter.bind(this)}>Runs scored from boundaries</button>
          <button className={this.isActive('donut')} onClick={this.handleDonut.bind(this)}>Team Breakdown</button>
        </div>
        <div className="chart" onClick={this.props.handleClick.bind(this)}>
        </div>
      </div>
    )
  }
}
