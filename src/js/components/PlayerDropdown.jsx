import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changePlayer } from '../redux/actions'
import { filterTeam } from '../core'
import R from 'ramda'


class Content extends Component {

  handleChange(event) {
    this.props.dispatch(changePlayer(event.target.value))
  }

  grabAllTeamGames(team) {
    return this.props.season.map((game) => {
      if (game.batting.teamOne.name === team) {
        return game.batting.teamOne.data
      } else if (game.batting.teamTwo.name === team) {
        return game.batting.teamTwo.data
      }
      else return null
    }).filter(x => (x !== null))
  }

  reduceForUniquePlayers(games){
    const flattenAndGrabPlayers = R.compose(R.uniq, R.map(x => x.batsman), R.flatten)
    return flattenAndGrabPlayers(games)
  }

  render() {
    const players = this.reduceForUniquePlayers(this.grabAllTeamGames(this.props.selectedTeam))
    return (
      <div className="player-dropdown">
        <select value={this.props.selectedPlayer} onChange={this.handleChange.bind(this)}>
          {players.map(name => {
            return <option key={name} value={name}>{name}</option>
          })}
        </select>

      </div>
    )
  }
}

function mapStateToProps(state){
  return state
}

export default connect(mapStateToProps)(Content)
