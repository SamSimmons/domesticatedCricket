import React, { Component } from 'react'
import d3 from 'd3'
import R from 'ramda'

import { getPlayerData, getPlayerTotals, filterTeam, getTeamTotals, getSeasonTotals, reduceSeasonToAverages, getSeasonAverage } from '../core'


export default class Profile extends Component {

  roundTwoPlaces(num) {return num.toFixed(2)}

  render() {
    const teamTotals = getTeamTotals(this.props.team, this.props.data)
    const season = getPlayerData(this.props.player, this.props.data)
    const totals = getPlayerTotals(season)
    const seasonAverages = reduceSeasonToAverages(this.props.data)
    const theAveragePlayer = getSeasonAverage(seasonAverages)
    const allSeasonTotal = getSeasonTotals(this.props.data)
    return (
      <div className="profile">
        <div className="profile-card">
          <div className="card-title">
            <h4>{this.props.player}</h4>
          </div>
          <div className="card-body">
            <p><span>2015/16 average:</span> {this.roundTwoPlaces(totals.runs / totals.out.toFixed())}</p>
            <p><span>Total runs:</span> {totals.runs}</p>
            <p><span>Balls Faced: </span>{totals.balls}</p>
            <p><span>Fours: </span>{totals.fours}</p>
            <p><span>Sixes: </span>{totals.sixes}</p>
            <p><span>Boundary rate: </span>{this.roundTwoPlaces((((totals.fours + totals.sixes) / totals.balls) * 100))}</p>
            <p><span>% of runs from boundaries: </span>{this.roundTwoPlaces((((totals.fours * 4) + (totals.sixes * 6)) / totals.runs) * 100)}</p>
            <p><span>% of team runs: </span>{this.roundTwoPlaces((totals.runs / teamTotals.runs) * 100)}</p>
          </div>
        </div>
      </div>
    )
  }
}
