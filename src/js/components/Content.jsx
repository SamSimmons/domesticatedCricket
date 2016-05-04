import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeTeam } from '../redux/actions.js'
import { filterTeam } from '../core.js'

import Chart from './Chart.jsx'

class Content extends Component {

  handleChange(event) {
    this.props.dispatch(changeTeam(event.target.value))
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
        <Chart data={filterTeam(this.props.selectedTeam, this.props.season)}/>
      </div>
    )
  }
}

function mapStateToProps(state){
  return state
}

export default connect(mapStateToProps)(Content)
