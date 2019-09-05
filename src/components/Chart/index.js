import React, {Component} from 'react'
import * as echarts from 'echarts'
import graph from './config.default'

export default class Chart extends Component {
  static defaultProps = {
    options: graph,
    height: 200
  }
  componentDidMount() {
    window.addEventListener('resize', () => {
      this.chartObj.resize()
    })
  }
  componentDidUpdate() {
    this.updateChart()
  }

  updateChart = () => {
    if (!this.props.graph) {
      return
    }
    const {options} = this.props

    if (this.chartRef) {
      if (!this.chartObj) {
        this.chartObj = echarts.init(this.chartRef, null, {
          renderer: 'svg'
        })
      }
      this.chartObj.setOption(options)
    }
  }
  render() {
    const {height} = this.props
    return (
      <div ref={ref => this.chartRef = ref} style={{
        width: '100%',
        height
      }}></div>
    )
  }
}