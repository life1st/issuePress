import React, {Component} from 'react'
import {connect} from 'react-redux'
import {mergeArray} from '../../utils/array_utils'
class LabelEditor extends Component {
  state = {
    showLables: []
  }
  componentDidMount() {
    const {labels} = this.props
    this.setState({
      showLables: mergeArray(this.state.showLables, Object.keys(labels))
    })
  }
  componentWillReceiveProps(nextProps) {
    const {labels} = nextProps
    console.log(labels)
    this.setState({
      showLables: mergeArray(this.state.showLables, Object.keys(labels))
    })
  }
  render() {
    const {showLables} = this.state
    const {labels} = this.props
    return (
      <div className="show-label">
        <ul>
          {
            showLables.map(key => (
              <li 
                key={key}
              >
                {labels[key].name}
              </li>
            ))
          }
        </ul>
        <input type="text" onKeyDown={this.handleKeyDown}/>
      </div>
    )
  }

  handleKeyDown = (e) => {
    console.log(e)
  }
}

const mapState2Props = ({article}) => ({
  labels: article.labels
})
export default connect(
  mapState2Props
)(LabelEditor)