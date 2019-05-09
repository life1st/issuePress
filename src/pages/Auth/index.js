import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {getAccessToken} from '../../utils/request/Auth'
import {str2Obj} from '../../utils/url'
import Dialog from '../../components/Dialog'
import css from './index.scss'

const url = 'https://github.com/login/oauth/authorize?client_id=1fd37dbf8bbc4d6bff18'

class Auth extends Component {

  componentDidMount() {
    const search = window.location.search
    if (!search) {
      // window.location.href = url
    } else {
      const {code} = str2Obj(search.slice(1))
      window.sessionStorage.setItem('git_code', code)
      // getAccessToken().then(res => {
      //   const data = str2Obj(res.data)
      //   if (data.error) {
      //     // todo handle err.
      //   } else {
      //     window.localStorage.setItem('git_access_token', data.access_token)
      //   }

      //   this.props.history.push('/')
      // })
    }
  }
  render() {
    return (
      <div>
        Authing...
        <Dialog place={['top', 'right']}>
          <p className={css.input}>
            <input type="text" name="username" placeholder='name' ref={ref => this.username = ref}/>
          </p>
          <p className={css.input}>
            <input type="password" name="pwd" placeholder='pwd' ref={ref => this.pwd = ref}/>
          </p>
          <button className={css.btn} type="submit" onClick={this.handleSubmit}>Submit</button>
        </Dialog>
      </div>
    )
  }

  handleSubmit = () => {
    const username = this.username.value
    const pwd = this.pwd.value

    window.localStorage.setItem('__auth', btoa(username + ':' + pwd))

    this.username.value = ''
    this.pwd.value = ''

    this.props.history.push('/')
  }
}

export default withRouter(Auth)