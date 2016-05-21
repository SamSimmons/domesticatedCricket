import React, { Component } from 'react'
import d3 from 'd3'
import R from 'ramda'

import { gatherPlayerData, reduceForTotals } from '../core'


export default class Profile extends Component {

  render() {
    let season = gatherPlayerData(this.props.player, this.props.data)
    let totals = reduceForTotals(season)
    console.log(totals)
    return (
      <div className="profile">
        <h4>{this.props.player}</h4>
        <p>Season average: {this.runs}</p>
        <p>Runs: {totals.runs}</p>
        <p>Balls Faced: {totals.balls}</p>
        <p>Fours: {totals.fours}</p>
        <p>Sixes: {totals.sixes}</p>
        <p>Likelihood to hit a boundary</p>
        <p>Percentage of runs from boundaries</p>
        <p>Percentage of team runs responsible for</p>
      </div>
    )
  }
}
