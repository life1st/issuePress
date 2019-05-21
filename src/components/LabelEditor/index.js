import React, {Component} from 'react'
import {connect} from 'react-redux'
import {mergeArray} from '../../utils/array_utils'
import css from './index.scss'

class LabelEditor extends Component {
  state = {
    showLables: [],
    inputVal: ''
  }
  componentDidMount() {
    const {labels} = this.props

    this.setState({
      // showLables: mergeArray(this.state.showLables, Object.keys(labels))
      showLables: mergeArray(this.state.showLables, Object.keys(labels).map(key => labels[key]))
    })
  }
  componentWillReceiveProps(nextProps) {
    const {labels} = nextProps
    this.setState({
      showLables: mergeArray(this.state.showLables, Object.keys(labels).map(key => labels[key]))
    })
  }
  render() {
    const {showLables, inputVal} = this.state
    const {labels} = this.props
    return (
      <div className={css.showLabel}>
        <ul className={css.labelList}>
          {
            showLables.map(label => (
              <li 
                style={{
                  backgroundColor: `#${label.color}`
                }}
                key={label.id}
              >
                {label.name}
              </li>
            ))
          }
          <li className={css.inputing}>{inputVal}</li>
        </ul>
        <input 
          className={css.input} 
          type="text" 
          value={inputVal}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown} />
      </div>
    )
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // handle submit
      this.setState({
        showLables: [...this.state.showLables, {name: this.state.inputVal, id: Math.random(), color: (Math.random() * 1000000 + '').slice(0,6)}],
        inputVal: ''
      })
    }
  }
  handleChange = (e) => {
    console.log(e.target.value)
    this.setState({
      inputVal: e.target.value
    })
  }
}

const mapState2Props = ({article}) => ({
  labels: article.labels
})
export default connect(
  mapState2Props
)(LabelEditor)