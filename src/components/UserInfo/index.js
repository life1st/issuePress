import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getLoginUserInfo} from '../../store/action'
import {loginUserIsAdmin} from '../../store/helper'
import css from './index.scss'

class UserInfo extends Component {
  componentDidMount() {
    this.props.getLoginUserInfo()
  }
  render() {
    const hasToken = !!window.localStorage.getItem('__auth')

    const {isAdmin, info} = this.props
    const {login: name} = info
    return (
      <div className={css.userInfo}>
        {
          hasToken ? (
            <>
              <p className={css.username}>{name}</p>
              {
                isAdmin && (
                  <>
                    <span className={css.adminBadge}>Admin</span>
                    <p className={css.newPost}>
                      <Link to='/new' className={css.link}>Make New Post -></Link>
                    </p>
                  </>
                )
              }
            </>
          ) : (
            <Link to="/auth" className={css.link}>to Auth</Link>
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