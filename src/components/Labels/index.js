import React, {Component} from 'react'
import {connect} from 'react-redux'
import {toggleLabelActive} from '../../store/action'
import css from './index.scss'
class Labels extends Component {
  render() {
    const {labels, activeLabels} = this.props

    const labelList = Object.keys(labels).map(key => ({
      ...labels[key],
      isActive: activeLabels.includes(Number(key))
    }))
    return (
      <div className={css.labels}>
        <h2 className={css.title}>Types</h2>
        <ul className={css.labelList}>
          {
            labelList.map(label => (
              <li 
                key={label.id} 
                className={css.label}
                onClick={() => this.handleItemClick(label)}
              >
                <p style={{
                  backgroundColor: label.isActive && `#${label.color}`,
                  color: !label.isActive && '#ccc'
                }}>{label.name}</p>
              </li>
            ))
          }
        </ul>
        {
          activeLabels.length > 0 && (
            <button 
              className={css.unselect} 
              onClick={this.handleUnselect}
            >
              unselect all
            </button>
          )
        }
      </div>
    )
  }

  handleUnselect = () => {
    this.props.activeLabels.forEach(id => this.props.toggleLabelActive({id}))
  }

  handleItemClick = (label) => {
    this.props.toggleLabelActive(label)
  }
}

const mapState2Props = ({article}) => ({
  labels: article.labels,
  activeLabels: article.activeLabels
})
export default connect(
  mapState2Props,
  {
    toggleLabelActive
  }
)(Labels)