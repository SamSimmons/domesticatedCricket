import React, { Component } from 'react'

export default class Colorchart extends Component {
  render() {
    return (
      <div className="color-chart">
        <div>
          <div className="color-block green"></div>
          <p>Player above average</p>
        </div>
        <div>
          <div className="color-block red"></div>
          <p>Player below average</p>
        </div>
        <div>
          <div className="color-block blue"></div>
          <p>League average</p>
        </div>
      </div>
    )
  }
}
