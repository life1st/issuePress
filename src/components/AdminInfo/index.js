import React, {Component} from 'react'
import css from './index.scss'
import {getAdminUserInfo} from '../../store/action'
import {connect} from 'react-redux'
import PlaceHolder from '../PlaceHolder'

const Fetching = () => (
  <div className={css.fetching}>
    <PlaceHolder radius='50%' height={50} width={50}/>
    <div className={css.meta}>
      <PlaceHolder height={10} width={120} />
      <PlaceHolder height={10} width={100} />
    </div>
  </div>
)
class AdminInfo extends Component {
  componentDidMount() {
    this.props.getAdminUserInfo()
  }
  render() {
    const {avatar_url, login: name, bio} = this.props.info
    return avatar_url ? (
      <div className={css.userInfo}>
          <img className={css.userAvatar} src={avatar_url} alt="avatar"/>
          <div className={css.meta}>
            <p className={css.name}>{name}</p>
            <p className={css.bio}>{bio}</p>
          </div>
        </div>
    ) : (<Fetching />)
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