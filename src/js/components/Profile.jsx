import React, { Component } from 'react'
import d3 from 'd3'
import R from 'ramda'

import { getPlayerData, getPlayerTotals, filterTeam, getTeamTotals } from '../core'


export default class Profile extends Component {

  render() {
    let teamTotals = getTeamTotals(this.props.team, this.props.data)
    let season = getPlayerData(this.props.player, this.props.data)
    let totals = getPlayerTotals(season)
    // console.log(totals)
    return (
      <div className="profile">
        <h4>{this.props.player}</h4>
        <p>Season average: {totals.runs / totals.out}</p>
        <p>Runs: {totals.runs}</p>
        <p>Balls Faced: {totals.balls}</p>
        <p>Fours: {totals.fours}</p>
        <p>Sixes: {totals.sixes}</p>
        <p>Likelihood to hit a boundary: {(totals.fours + totals.sixes) / totals.balls}</p>
        <p>Percentage of runs from boundaries: {((totals.fours * 4) + (totals.sixes * 6)) / totals.runs}</p>
        <p>Percentage of team runs responsible for: {totals.runs / teamTotals.runs}</p>
      </div>
    )
  }
}
