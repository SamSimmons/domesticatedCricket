import React, { Component } from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Main from './Main.jsx'

export default class Layout extends Component {
  render () {
    return (
      <div className="page">
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }
}
