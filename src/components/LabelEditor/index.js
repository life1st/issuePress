import React, {Component} from 'react'
import {connect} from 'react-redux'
import {classnames} from 'classnames'
import css from './index.scss'

class LabelEditor extends Component {
  state = {
    showLables: [],
    inputVal: ''
  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isEncryption) {
      this.setState({
        showLabels: [
          ...this.state.showLables, 
          {
            name: 'encryption',
            color: 233333
          }
        ]
      })
    }
  }
  render() {
    const {showLables, inputVal} = this.state
    const {labels} = this.props

    const labelsArr = Object.keys(labels).map(key => labels[key])
    return (
      <div className={css.showLabel}>
        <ul className={css.labelList}>
          {
            showLables.map(label => (
              <li key={label.id}>
                <span 
                  className={css.lableItem}
                  style={{backgroundColor: `#${label.color}`}}
                >
                  {label.name}
                </span>
                <span onClick={() => this.handleLabelDisable(label)}>❌</span>
              </li>
            ))
          }
        </ul>
        <div className={css.inputContiner}>
          <input 
            className={css.input} 
            type="text" 
            value={inputVal}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown} />
            <ul className={css.candidateList}>
            {
              labelsArr.map(label => (
                <li key={label.id}>
                  <span 
                    className={css.lableItem}
                    style={{
                      backgroundColor: `#${label.color}`
                    }}
                  >{label.name}</span>
                </li>
              ))
            }
            </ul>
        </div>
        
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

  handleLabelDisable = (label) => {

  }
}

const mapState2Props = ({article}) => ({
  labels: article.labels
})
export default connect(
  mapState2Props
)(LabelEditor)