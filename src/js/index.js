import '../style/index.scss'

import React, {Component} from 'react'
import { Router, Route, IndexRoute, hashHistory }from "react-router";
import { render } from 'react-dom'

import Layout from './components/Layout.jsx'

render(
  <Layout />,
  document.getElementById('app')
)
