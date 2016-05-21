import React, { Component } from 'react'
import d3 from 'd3'
import R from 'ramda'

import { gatherPlayerData } from '../core'


export default class Profile extends Component {

  render() {
    let season = gatherPlayerData(this.props.player, this.props.data)
    // console.log(season)
    return (
      <div className="profile">
        <h2>{this.props.player}</h2>
      </div>
    )
  }
}
