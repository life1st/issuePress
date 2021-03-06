import React, {Component} from 'react'
import {Provider} from 'react-redux'
import { HashRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import store from './store'
import {ToastsContainer, ToastsStore} from 'react-toasts'
import {pages} from './routes'
import Home from './pages/Home'
import AdminInfo from './components/AdminInfo'
import UserInfo from './components/UserInfo'
import {
  LoadAbleAuth,
  LoadAbleArticle,
  LoadAbleEditor
} from './routes/lazyComponent'

import css from './app.scss'

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Provider store={store}>
          <Router>
            <div className={css.header}>
              <AdminInfo />
              <UserInfo />
            </div>
            <ul className={css.nav}>
              {
                pages.map(page => (
                  <li className={css.navItem} key={page.name}>
                    <Link to={`/${page.name}`}>{page.name}</Link>
                  </li>
                ))
              }
            </ul>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/auth' component={LoadAbleAuth} />
              <Route exact path='/article/:number' component={LoadAbleArticle} />
              <Route exact path='/new' component={LoadAbleEditor} />
              <Route exact path='/edit/:number' component={LoadAbleEditor} />
              {
                pages.map(page => (
                  <Route exact path={`/${page.name}`} component={page.component} key={page.name}/>
                ))
              }
              <Redirect to='/' />
            </Switch>
          </Router>
          <ToastsContainer store={ToastsStore} />
        </Provider>
      </div>
    )
  }
}

export default App