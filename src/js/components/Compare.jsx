import React, { Component } from 'react'
import d3 from 'd3'
import R from 'ramda'
import { createComparison } from '../compareGraph'

export default class Compare extends Component {

  componentDidMount() {
    createComparison([this.props.player, this.props.average], this.props.top, this.props.node)
  }

  updateGraph(){
    d3.select('.' + this.props.node + ' svg').remove()
    createComparison([this.props.player, this.props.average], this.props.top, this.props.node)
  }

  render() {
    this.updateGraph()
    return (
      <div className="compare">
        <div className={this.props.node}></div>
      </div>
    )
  }
}
