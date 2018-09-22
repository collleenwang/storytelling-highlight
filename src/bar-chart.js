import * as d3 from 'd3'

const margin = {
  top: 30,
  right: 20,
  bottom: 30,
  left: 20
}

const width = 700 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom

//some scales//
const svg = d3
  .select('#bar-chart')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const xPositionScale = d3.scaleBand().range([0, width])

const yPositionScale = d3
  .scaleLinear()
  .domain([0, 85])
  .range([0, height])

const colorScale = d3
  .scaleOrdinal()
  .range(['#b2e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae'])


d3.csv(require('./countries.csv')).then(ready)

function ready(datapoints) {

  // Sort the countries from low to high
  datapoints = datapoints.sort((a, b) => {
    return a.life_expectancy - b.life_expectancy
  })

  // And set up the domain of the xPositionScale
  // using the read-in data
  const countries = datapoints.map(d => d.country)
  xPositionScale.domain(countries)

  /* Add your rectangles here */


  d3.select('#asia').on('clikc', function() {
    svg.selectAll('rect').attr('fill', function(d) {
      if (d.continent === 'Asia') {
        return 'red'
      } else {
        return 'gray'
      }
    })
  })

  d3.select('#africa').on('click', function() {
    svg.selectAll('rect').attr('fill', function(d) {
      if (d.continent === 'Africa') {
        return 'yellow'
      } else {
        return 'gray'
      }
    })
  })


  d3.select('#north-america').on('click', function() {
    svg.selectAll('rect').attr('fill', function(d) {
      if (d.continent === 'N. America') {
        return 'black'
      } else {
        return 'gray'
      }
    })
  })
  

  d3.select('#low-GDP-countries').on('click', function() {
    svg.selectAll('rect').attr('fill', function(d) {
      if (d.gdp_per_capita < '2000') {
        return 'lightgree'
      } else {
        return 'gray'
      }
    })
  })

 d3.select('#color-by-continent').on('click', function() {
    svg.selectAll('rect').attr('fill', function(d) {
     return colorScale(d.continent)
    })
  })


 d3.select('#reset').on('click', function() {
    svg.selectAll('circle').attr('fill', function(d) {
      return colorScale(d.continent)
    })
  })

svg
    .selectAll('rect')
    .data(datapoints)
    .enter()
    .append('tect')
    .attr('height', 20)
    .attr('width', d => {
      return xPositionScale(d.gdp_per_capita)
    })
    .attr('class', d => {
      return d.continent.toLowerCase()
    })
    .attr('fill', d => {
      return colorScale(d.continent)
    })





  const yAxis = d3
    .axisLeft(yPositionScale)
    .tickSize(-width)
    .ticks(5)

  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .call(yAxis)
    .lower()

  d3.select('.y-axis .domain').remove()
}
