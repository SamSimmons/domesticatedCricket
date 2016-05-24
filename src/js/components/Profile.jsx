import React, { Component } from 'react'
import d3 from 'd3'
import R from 'ramda'
import Compare from './Compare.jsx'

import {
  getPlayerData,
  getPlayerTotals,
  filterTeam,
  getTeamTotals,
  getSeasonTotals,
  reduceSeasonToAverages,
  getSeasonAverage,
  getMaxes
} from '../core'


export default class Profile extends Component {

  roundTwoPlaces(num) {return num.toFixed(2)}

  render() {
    const teamTotals = getTeamTotals(this.props.team, this.props.data)
    const season = getPlayerData(this.props.player, this.props.data)
    const totals = getPlayerTotals(season)
    const eachPlayerAverages = reduceSeasonToAverages(this.props.data)
    const theAveragePlayer = getSeasonAverage(eachPlayerAverages)
    const maxes = getMaxes(eachPlayerAverages)
    const allSeasonTotal = getSeasonTotals(this.props.data)
    return (
      <div className="profile">
        <div className="profile-card">
          <div className="card-title">
            <h4>{this.props.player}</h4>
          </div>
          <div className="card-body">
            <div>
              <p><span>2015/16 average:</span> {this.roundTwoPlaces(totals.runs / totals.out.toFixed())}</p>
              <Compare
                player={totals.runs / totals.out}
                average={allSeasonTotal.runs / allSeasonTotal.out}
                top={maxes.average}
                node={'place-0'}
                />
            </div>
            <div>
              <p><span>Total runs:</span> {totals.runs}</p>
              <Compare
                player={totals.runs}
                average={theAveragePlayer.runs}
                top={maxes.runs}
                node={'place-1'}
                />
            </div>
            <div>
              <p><span>Balls Faced: </span>{totals.balls}</p>
                <Compare
                  player={totals.balls}
                  average={theAveragePlayer.balls}
                  top={maxes.balls}
                  node={'place-2'}
                  />
            </div>
            <div>
              <p><span>Fours: </span>{totals.fours}</p>
                <Compare
                  player={totals.fours}
                  average={theAveragePlayer.fours}
                  top={maxes.fours}
                  node={'place-3'}
                  />
            </div>
            <div>
              <p><span>Sixes: </span>{totals.sixes}</p>
                <Compare
                  player={totals.sixes}
                  average={theAveragePlayer.sixes}
                  top={maxes.sixes}
                  node={'place-4'}
                  />
            </div>
            <div>
              <p><span>Boundary rate: </span>{this.roundTwoPlaces((((totals.fours + totals.sixes) / totals.balls) * 100))}</p>
                <Compare
                  player={(totals.fours * totals.sixes) / totals.balls}
                  average={(theAveragePlayer.fours * theAveragePlayer.sixes) / theAveragePlayer.balls}
                  top={(maxes.fours * maxes.sixes) / maxes.balls}
                  node={'place-5'}
                  />
            </div>
            <div>
              <p><span>% of runs from boundaries: </span>{this.roundTwoPlaces((((totals.fours * 4) + (totals.sixes * 6)) / totals.runs) * 100)}</p>
                <Compare
                  player={( totals.fours * 4) + ( totals.sixes * 6) / totals.runs}
                  average={( theAveragePlayer.fours * 4) + ( theAveragePlayer.sixes * 6) / theAveragePlayer.runs}
                  top={( maxes.fours * 4) + ( maxes.sixes * 6) / maxes.runs}
                  node={'place-6'}
                  />
            </div>
            <div>
              <p><span>% of team runs: </span>{this.roundTwoPlaces((totals.runs / teamTotals.runs) * 100)}</p>

            </div>
          </div>
        </div>
      </div>
    )
  }
}
