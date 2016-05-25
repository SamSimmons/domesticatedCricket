import React, { Component } from 'react'
import d3 from 'd3'

import {
  mapDataToPlayers,
  flattenAndRemoveEmptyGames,
  reduceForUniquePlayers,
  getPlayerData,
  getPlayerTotals
} from '../core'

import { createBar } from '../barChart'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      'searching': false,
      'possibleMatches': []
    }
  }

  checkSearch(possible) {
    const possiblePlayers = reduceForUniquePlayers(flattenAndRemoveEmptyGames(this.props.data)).map(fullName => {
      return {
        'fullName': fullName,
        'lastName': fullName.split(' ').slice(1).join(' ')
      }
    })

    let possibleMatches = possiblePlayers.filter(nameObj => {
      return nameObj.lastName.substring(0, possible.length).toLowerCase() === possible.toLowerCase()
    })
    return possibleMatches
  }

  handleSearch(){
    this.setState({
      ...this.state,
      'searching': true,
      'selectedMatch': ""
    })
  }

  handleChange(e){
    const possibleMatches = this.checkSearch(e.target.value)
    this.setState({
      ...this.state,
      possibleMatches
    })
  }

  handleSelection(e){
    this.setState({
      ...this.state,
      'searching': false,
      'selectedMatch': e.target.innerHTML
    })
    this.addGraph(e.target.innerHTML)
  }

  addGraph(clickedName) {
    let playerA = getPlayerTotals(getPlayerData(this.props.player, this.props.data))
    let playerB = getPlayerTotals(getPlayerData(clickedName, this.props.data))
    createBar([playerA, playerB])
  }

  render() {
    const allPlayersSeason = mapDataToPlayers(this.props.data)
    let content = this.state.searching ? this.state.possibleMatches.map(name => {
      return <p onClick={this.handleSelection.bind(this)} key={name.fullName}>{name.fullName}</p>
    }) : <p>Enter a last name to compare players</p>
    return (
      <div className="search">
        <div className="search-card">
          <div className="card-title">
            <input
              ref="searchbar"
              onFocus={this.handleSearch.bind(this)}
              onChange={this.handleChange.bind(this)}
              type="search"
              placeholder="Type last name to search" />
          </div>
          <div className="card-body">
            <div className="search-placeholder">
              {content}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
