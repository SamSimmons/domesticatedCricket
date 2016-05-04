// const data = require('../../data/2014.json')
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer'

//create initial store
let initialState = {}
const store = createStore(reducer, initialState)

export default store
