import React, {Component} from 'react'
import PropTypes from 'prop-types'
import EasyMde from 'easymde'
import 'easymde/dist/easymde.min.css'

const mdeConfig = {
  autofocus: true
}

class MdEditor extends Component {
  static propTypes = {
    content: PropTypes.string,
    onSubmit: PropTypes.func
  }

  componentDidMount() {
    this.mde = new EasyMde({
      element: this.textarea,
      ...mdeConfig
    })

    this.handleValueChange()
  }

  componentWillReceiveProps(nextProps) {
    const {content} = nextProps

    if (content) {
      this.mde.value(content)
    }
  }
  render() {
    return (
      <div>
        <textarea ref={ref => this.textarea = ref}></textarea>
      </div>
    )
  }

  handleValueChange = () => {
    this.mde.codemirror.on('change', () => {
      this.props.onChange && this.props.onChange(this.mde.value())
    })
  }

  handleSubmit = () => {
    this.props.onSubmit && this.props.onSubmit(this.mde.value())
  }
}

export default MdEditor