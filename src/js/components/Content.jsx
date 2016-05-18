import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeTeam, changePlayer } from '../redux/actions'
import { filterTeam } from '../core'

import Chart from './Chart.jsx'
import PlayerDropdown from './PlayerDropdown.jsx'

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
    // console.log(this.props.season)
    return (
      <div>
        <select value={this.props.selectedTeam} onChange={this.handleChange.bind(this)}>
          <option value="Auckland">Auckland Aces</option>
          <option value="Canterbury">Canterbury Kings</option>
          <option value="Central Districts">Central Districts Stags</option>
          <option value="Northern Districts">Northern Knights</option>
          <option value="Otago">Otago Volts</option>
          <option value="Wellington">Wellington Firebirds</option>
        </select>
        <PlayerDropdown />
        <Chart selectedPlayer={this.props.selectedPlayer}
               data={filterTeam(this.props.selectedTeam, this.props.season)}
               handleClick={this.chartClick.bind(this)}
               />
      </div>
    )
  }
}

function mapStateToProps(state){
  return state
}

export default connect(mapStateToProps)(Content)
