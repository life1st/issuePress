import React, {Component} from 'react'
import css from './index.scss'
import {getAdminUserInfo} from '../../store/action'
import {connect} from 'react-redux'

class AdminInfo extends Component {
  componentDidMount() {
    this.props.getAdminUserInfo()
  }
  render() {
    const {avatar_url, login: name, bio} = this.props.info
    return (
      <div className={css.userInfo}>
        <img className={css.userAvatar} src={avatar_url} alt="avatar"/>
        <div className={css.meta}>
          <p className={css.name}>{name}</p>
          <p className={css.bio}>{bio}</p>
        </div>
      </div>
    )
  }
}

const mapState2Props = ({user}) => ({
  info: user.admin
})
export default connect(
  mapState2Props,
  {
    getAdminUserInfo
  }
)(AdminInfo)