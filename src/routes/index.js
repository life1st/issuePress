import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  LoadAbleAuth,
  LoadAbleArticle,
  LoadAbleArticleList
} from './lazyComponent'

import css from './index.scss'

export const pages = [
  {
    name: 'list',
    component: LoadAbleArticleList
  },
]
