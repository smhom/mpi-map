import React, { Component } from 'react'
import {mpi_values, 
    health_contribution,
    livingstandard_contribution, 
    education_contribution} from './data';
    
import './App.css'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
class BarChart extends Component {
   constructor(props){
      super(props)
      this.createBarChart = this.createBarChart.bind(this)
   }
   componentDidMount() {
      this.createBarChart()
   }
   componentDidUpdate() {
      this.createBarChart()
   }
   createBarChart() {
      const node = this.node
      const dataMax = max(mpi_values.values())
      const yScale = scaleLinear()
         .domain([0, dataMax])
         .range([0, mpi_values.size()])
   select(node)
      .selectAll('rect')
      .data(mpi_values.values())
      .enter()
      .append('rect')
   
   select(node)
      .selectAll('rect')
      .data(mpi_values.values())
      .exit()
      .remove()
   
   select(node)
      .selectAll('rect')
      .data(mpi_values.values())
      .style('fill', '#fe9922')
      .attr('x', (d,i) => i * 25)
      .attr('y', d =>  mpi_values.size()-yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', 25)
   }
render() {
      return <svg ref={node => this.node = node}
      // width={500} height={500}
      >
      </svg>
   }
}
export default BarChart