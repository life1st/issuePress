import React, {Component} from 'react'
import {Provider} from 'react-redux'
import store from './store'
import Pages from './routes'
import AdminInfo from './components/AdminInfo'
import UserInfo from './components/UserInfo'

import css from './app.scss'

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Provider store={store}>
          <div className={css.header}>
            <AdminInfo />
            <UserInfo />
          </div>
          <Pages />
        </Provider>
      </div>
    )
  }
}

export default App