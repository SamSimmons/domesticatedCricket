import React, { Component } from 'react'
import d3 from 'd3'
import R from 'ramda'
import { createLineGraph } from '../graph'

export default class Chart extends Component {

  componentDidMount() {
    createLineGraph(this.props.data, this.props.selectedPlayer)
  }

// TODO use find here and find the player data and return it if it matches


  updateGraph(){
    d3.select('svg').remove()
    createLineGraph(this.props.data, this.props.selectedPlayer)
  }


  render() {
    this.updateGraph()
    return (
      <div className="chart" onClick={this.props.handleClick.bind(this)}>

      </div>
    )
  }
}
