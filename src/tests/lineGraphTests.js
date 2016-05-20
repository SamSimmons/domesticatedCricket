import {
  reduceForUniquePlayers,
  getPlayersSeason,
  findMaxSeasonRuns,
  findMaxAverage,
  getRunsPer,
  getRunningTotals
} from '../js/graph.js'

import R from 'ramda'
import test from 'tape'

const data = [
  [
    {
      "batsman": "T. Correct",
      "runs" : 5
    }
  ], [
    {
      "batsman": "B. RightAnswer",
      "runs": 50
    },
    {
      "batsman" : "F. Woohoo",
      "runs": 11
    },
    {
      "batsman" : "B. HulkHogan",
      "runs" : 13
    }
  ],
  [
    {
      "batsman" : "B. HulkHogan",
      "runs": 55
    }
  ]
]

const season = [
  {
    "batsman" : "B. HulkHogan",
    "runs": 5
  },
  {
    "batsman" : "B. HulkHogan",
    "runs": 35
  },
  {
    "batsman" : "B. HulkHogan",
    "runs": 12
  },
  {
    "batsman" : "B. HulkHogan",
    "runs": 0
  },
  {
    "batsman" : "B. HulkHogan",
    "runs": 55
  },
  {
    "batsman" : "B. HulkHogan",
    "runs": 30
  },
  {
    "batsman" : "B. HulkHogan",
    "runs": 48
  }
]

test('can pull all the unique players names out from the data as individual strings', (t) => {
  const expected = ["T. Correct", "B. RightAnswer", "F. Woohoo", "B. HulkHogan"]

  t.deepEqual(reduceForUniquePlayers(data), expected)
  t.end()
})

test('Can pull an individuals players season from the data', (t) => {
  const name = "B. HulkHogan"
  const expected = [
    {
      "batsman" : "B. HulkHogan",
      "runs" : 13
    },
    {
      "batsman" : "B. HulkHogan",
      "runs": 55
    }
  ]
  t.deepEqual(getPlayersSeason(name, data), expected)
  t.end()
})

test('can find the maximum total runs anyone has scored', (t) => {
  const expected = 68
  const players = reduceForUniquePlayers(data)
  t.equal(findMaxSeasonRuns(data, players), expected)
  t.end()
})

test('can find a players moving averages', (t) => {
  const expected = [ { batsman: 'B. HulkHogan', runs: 5 }, { batsman: 'B. HulkHogan', runs: 20 }, { batsman: 'B. HulkHogan', runs: 17.333333333333332 }, { batsman: 'B. HulkHogan', runs: 13 }, { batsman: 'B. HulkHogan', runs: 21.4 }, { batsman: 'B. HulkHogan', runs: 22.833333333333332 }, { batsman: 'B. HulkHogan', runs: 26.428571428571427 } ]

  t.deepEqual(getRunsPer(season), expected)
  t.end()
})

test('can find the maximum average any player has had over the season', (t) => {
  const expected = 50
  const players = reduceForUniquePlayers(data)

  t.equal(findMaxAverage(data, players), expected)
  t.end()
})
