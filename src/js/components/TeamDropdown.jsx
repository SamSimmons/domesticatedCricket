import React, { Component } from 'react'

export default class TeamDropdown extends Component {

  render() {
    return (
      <div className="team-dropdown">
        <select value={this.props.selectedTeam} onChange={this.props.handleChange.bind(this)}>
          <option value="Auckland">Auckland Aces</option>
          <option value="Canterbury">Canterbury Kings</option>
          <option value="Central Districts">Central Districts Stags</option>
          <option value="Northern Districts">Northern Knights</option>
          <option value="Otago">Otago Volts</option>
          <option value="Wellington">Wellington Firebirds</option>
        </select>
      </div>
    )
  }
}
