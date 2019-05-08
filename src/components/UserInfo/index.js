import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getLoginUserInfo} from '../../store/action'
import {loginUserIsAdmin} from '../../store/helper'
import css from './index.scss'

class UserInfo extends Component {
  componentDidMount() {
    this.props.getLoginUserInfo()
  }
  render() {
    const {isAdmin, info} = this.props
    const {login: name} = info
    return (
      <div className={css.userInfo}>
        <p className={css.username}>{name}</p>
        {
          isAdmin && (
            <span className={css.adminBadge}>Admin</span>
          )
        }
      </div>
    )
  }
}


const mapState2Props = ({user}) => ({
  info: user.login,
  isAdmin: loginUserIsAdmin({user})
})
export default connect(
  mapState2Props,
  {
    getLoginUserInfo
  }
)(UserInfo)