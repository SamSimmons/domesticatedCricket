import React, { Component } from 'react'
import Content from './Content.jsx'
import Title from './Title.jsx'

export default class Main extends Component {
  render() {
    return (
      <div className="main">
        <Title />
        <Content />
      </div>
    )
  }
}
