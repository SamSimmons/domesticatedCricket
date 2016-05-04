import '../style/index.scss'

import React, {Component} from 'react'
import { Router, Route, IndexRoute, hashHistory }from "react-router";
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

import Layout from './components/Layout.jsx'

render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  document.getElementById('app')
)
