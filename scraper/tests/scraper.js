const test = require('tape')
const fs = require('fs')
import { doesNotHaveBracket,
        isNotWierdSpace,
        breakSeasonIntoChunks,
        createBattingObject,
        createBowlingObject
      } from '../shapeData'

test('Test if string contains a parantheses', (t) => {
  let withoutString = "string without bracket"
  let withString = "string with a ( bracket"
  t.equal(doesNotHaveBracket(withoutString), true)
  t.equal(doesNotHaveBracket(withString), false)
  t.end()
})

test('Can check if a string is a space', (t) => {
  let space = " "
  let notSpace = "hjhj"
  let almostSpace = "jgj k"
  let startWithSpace = " ghgh"
  t.equal(isNotWierdSpace(space), false)
  t.equal(isNotWierdSpace(notSpace), true)
  t.equal(isNotWierdSpace(startWithSpace), true)
  t.equal(isNotWierdSpace(almostSpace), true)
  t.end()
})

test('can break scraped data from cricinfo into workable chunks', (t) => {
  fs.readFile('season.json', (err, data) => {
    t.notOk(err)
    t.ok(data, 'data loaded ok')
    let season = breakSeasonIntoChunks(JSON.parse(data))
    t.equal(season.length, 33, 'should be 33 games in the season')
    season.forEach((entry) => {
      t.ok(entry.hasOwnProperty("link"), 'every game should have a link, a batting array and a link')
      t.ok(entry.hasOwnProperty("batting"), 'every game should have a link, a batting array and a batting array')
      t.ok(entry.hasOwnProperty("bowling"), 'every game should have a link, a batting array and a bowling array')
    })
    t.end()
  })

  test('can break an array into a workable object representing cricket data', (t) => {
    let battingArr = [1,2,3,4,5,6,7,8]
    let bowlingArr = [1,2,3,4,5,6]
    let bowlingObj = createBowlingObject(bowlingArr)
    let battingObj = createBattingObject(battingArr)
    t.ok(battingObj.hasOwnProperty('batsman'), 'batsman')
    t.ok(battingObj.hasOwnProperty('dismissal'), 'dismissal')
    t.ok(battingObj.hasOwnProperty('runs'), 'runs')
    t.ok(battingObj.hasOwnProperty('minutes'), 'minutes')
    t.ok(battingObj.hasOwnProperty('balls'), 'balls')
    t.ok(battingObj.hasOwnProperty('fours'), 'fours')
    t.ok(battingObj.hasOwnProperty('sixes'),'sixes')
    t.ok(battingObj.hasOwnProperty('strikeRate'), 'strikeRate')
    t.ok(bowlingObj.hasOwnProperty('bowler'), 'bowler')
    t.ok(bowlingObj.hasOwnProperty('overs'), 'overs')
    t.ok(bowlingObj.hasOwnProperty('maidens'), 'maidens')
    t.ok(bowlingObj.hasOwnProperty('runs'),'runs')
    t.ok(bowlingObj.hasOwnProperty('wickets'), 'wickets')
    t.ok(bowlingObj.hasOwnProperty('economy'), 'economy')

    t.end()
  })
})
