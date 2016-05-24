import React, { Component } from 'react'

import { mapDataToPlayers } from '../core'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      'searching': false
    }
  }

  handleSearch(){
    this.setState({
      'searching': true
    })
  }

  render() {
    const allPlayersSeason = mapDataToPlayers(this.props.data)
    console.log(allPlayersSeason)
    let content = this.state.searching ? "searching" : "not searching"
    return (
      <div className="search">
        <div className="search-card">
          <div className="card-title">
            <input onFocus={this.handleSearch.bind(this)} type="search" placeholder="Type last name to search" />
          </div>
          <div className="card-body">
            {content}
          </div>
        </div>
      </div>
    )
  }
}
