const data = require('../../../data/2014.json')
// const data = require('../../../data/beep.json')
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer'


//create initial store
let initialState = {
  season: data,
  selectedTeam: "Auckland"
 }
// let initialState = { hello: "world"}
// console.log(data)
const store = createStore(reducer, initialState)

export default store
