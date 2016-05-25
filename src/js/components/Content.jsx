import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeTeam, changePlayer } from '../redux/actions'
import { filterTeam } from '../core'

import Chart from './Chart.jsx'
import PlayerDropdown from './PlayerDropdown.jsx'
import TeamDropdown from './TeamDropdown.jsx'
import Profile from './Profile.jsx'
import Search from './Search.jsx'

class Content extends Component {

  handleChange(event) {
    this.props.dispatch(changeTeam(event.target.value))
  }

  chartClick(e) {
    if (e.target.id) {
      this.props.dispatch(changePlayer(e.target.id))
    }
  }

  render() {
    return (
      <div>
        <div className="chart-content">
          <TeamDropdown selectedTeam={this.props.selectedTeam} handleChange={this.handleChange.bind(this)}/>
          <PlayerDropdown />
          <Chart selectedPlayer={this.props.selectedPlayer}
            data={filterTeam(this.props.selectedTeam, this.props.season)}
            handleClick={this.chartClick.bind(this)}
            team={this.props.selectedTeam}
            />
        </div>
        <div class="player-content">
          <Profile team={this.props.selectedTeam} player={this.props.selectedPlayer} data={this.props.season} />
          <Search
            data={this.props.season}
            player={this.props.selectedPlayer}
            />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return state
}

export default connect(mapStateToProps)(Content)
