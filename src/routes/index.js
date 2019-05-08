import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import Home from '../pages/Home'
import {
  LoadAbleAuth,
  LoadAbleArticle,
  LoadAbleArticleList
} from './lazyComponent'

import css from './index.scss'

const pages = [
  {
    name: 'list',
    component: LoadAbleArticleList
  },
]

class Pages extends Component {
  render() {
    const hasToken = !!window.localStorage.getItem('git_access_token')
    return (
      <Router>
        <ul className={css.nav}>
          {
            pages.map(page => (
              <li className={css.navItem} key={page.name}>
                <Link to={`/${page.name}`}>{page.name}</Link>
              </li>
            ))
          }
          {
            !hasToken && (
              <li className={css.navItem}>
                <Link to='/auth'>auth</Link>
              </li>
            )
          }
        </ul>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/auth' component={LoadAbleAuth} />
          <Route exact path='/article/:number' component={LoadAbleArticle} />
          {
            pages.map(page => (
              <Route exact path={`/${page.name}`} component={page.component} key={page.name}/>
            ))
          }
          <Redirect to='/' />
        </Switch>
      </Router>
    )
  }
}

export default Pages