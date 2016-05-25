import d3 from 'd3'
import R from 'ramda'

function createBar(data) {
  // console.log(data)
  const playerA = data[0].batsman
  const playerB = data[1].batsman
  const runs = data.map(x => x.runs)
  const balls = data.map(x => x.balls)
  const fours = data.map(x => x.fours)
  const sixes = data.map(x => x.sixes)
  const boundaryRate = data.map(x => ((x.sixes + x.fours) / x.balls) * 100)

  const width = 400
  const height = 500
  const barHeight = 25

  let color = [
    'tomato',
    'steelblue'
  ]
//Title-------------------------------------------------------------------------
  const title = d3.select('.search-placeholder').append('div')
    .attr('class', 'search-title-block')
    title.append('h2')
    .text(playerA + ' vs ' + playerB)
    .attr('class', 'child')

    title.append('div')
      .attr('class', 'color-block')
      .style('background-color', color[0])
    title.append('p')
      .text(playerA)

      title.append('div')
        .attr('class', 'color-block')
        .style('background-color', color[1])
      title.append('p')
        .text(playerB)



//Runs--------------------------------------------------------------------------
  const runsHeader = d3.select('.search-placeholder').append('h3')
    .text('Runs')
    .attr('class', 'child')
  const runsContainer = d3.select('.search-placeholder').append('svg')
  .attr({
    'width': width,
    'height': barHeight * runs.length
  })
  .attr('class', 'child')


  const xRuns = d3.scale.linear()
    .domain([0, d3.max(runs)])
    .range([0, width]);

  const runsBar = runsContainer.selectAll('g')
    .data(runs)
    .enter().append('g')
    .attr("transform", (d, i) => "translate(0," + i * barHeight + ")")

    runsBar.append("rect")
    .attr("width", xRuns)
    .attr("height", barHeight - 1)
    .attr('class', 'child')
    .style('fill', (d, i) => color[i])

//Balls-------------------------------------------------------------------------
  const ballsHeader = d3.select('.search-placeholder').append('h3')
    .text('Balls Faced')
    .attr('class', 'child')

  const ballsContainer = d3.select('.search-placeholder').append('svg')
    .attr({
      'width': width,
      'height': barHeight * balls.length
    })
    .attr('class', 'child')


  const xBalls = d3.scale.linear()
    .domain([0, d3.max(balls)])
    .range([0, width]);

  const ballsBar = ballsContainer.selectAll('g')
    .data(balls)
    .enter().append('g')
    .attr("transform", (d, i) => "translate(0," + i * barHeight + ")")
    .attr('class', 'child')

    ballsBar.append("rect")
    .attr("width", xBalls)
    .attr("height", barHeight - 1)
    .style('fill', (d, i) => color[i])
    .attr('class', 'child')


//Fours--------------------------------------------------------------------------
  const foursHeader = d3.select('.search-placeholder').append('h3')
    .text('Fours')
    .attr('class', 'child')

  const foursContainer = d3.select('.search-placeholder').append('svg')
    .attr({
      'width': width,
      'height': barHeight * fours.length
    })
    .attr('class', 'child')


  const xFours = d3.scale.linear()
    .domain([0, d3.max(fours)])
    .range([0, width]);

  const foursBar = foursContainer.selectAll('g')
    .data(fours)
    .enter().append('g')
    .attr("transform", (d, i) => "translate(0," + i * barHeight + ")")
    .attr('class', 'child')

    foursBar.append("rect")
    .attr("width", xFours)
    .attr("height", barHeight - 1)
    .style('fill', (d, i) => color[i])
    .attr('class', 'child')


//Sixes--------------------------------------------------------------------------
  const sixesHeader = d3.select('.search-placeholder').append('h3')
  .text('Sixes')
  .attr('class', 'child')

  const sixesContainer = d3.select('.search-placeholder').append('svg')
    .attr({
      'width': width,
      'height': barHeight * sixes.length
    })
    .attr('class', 'child')


  const xSixes = d3.scale.linear()
    .domain([0, d3.max(sixes)])
    .range([0, width]);

  const sixesBar = sixesContainer.selectAll('g')
    .data(sixes)
    .enter().append('g')
    .attr("transform", (d, i) => "translate(0," + i * barHeight + ")")
    .attr('class', 'child')


    sixesBar.append("rect")
    .attr("width", xSixes)
    .attr("height", barHeight - 1)
    .style('fill', (d, i) => color[i])
    .attr('class', 'child')

//Boundary Rate--------------------------------------------------------------------------
  const brHeader = d3.select('.search-placeholder').append('h3')
    .text('Boundary Rate: ')
    .attr('class', 'child')

  const brContainer = d3.select('.search-placeholder').append('svg')
    .attr({
      'width': width,
      'height': barHeight * boundaryRate.length
    })
    .attr('class', 'child')


  const xBoundaryRate = d3.scale.linear()
    .domain([0, d3.max(boundaryRate)])
    .range([0, width]);

  const boundaryRateBar = brContainer.selectAll('g')
    .data(boundaryRate)
    .enter().append('g')
    .attr("transform", (d, i) => "translate(0," + i * barHeight + ")")
    .attr('class', 'child')


    boundaryRateBar.append("rect")
    .attr("width", xBoundaryRate)
    .attr("height", barHeight - 1)
    .style('fill', (d, i) => color[i])
    .attr('class', 'child')

//---------------------------------------------------------------------------------

}

export {
  createBar
}
