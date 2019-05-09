import React from 'react'
import Loadable from 'react-loadable'

const Loading = () => (
  <div>Loading...</div>
)

export const LoadAbleAuth = Loadable({
  loader: () => import('../pages/Auth'),
  loading: Loading
})

export const LoadAbleArticle = Loadable({
  loader: () => import('../pages/Article'),
  loading: Loading
})

export const LoadAbleArticleList = Loadable({
  loader: () => import('../pages/ArticleList'),
  loading: Loading
})

export const LoadAbleNewArticle = Loadable({
  loader: () => import('../pages/NewArticle'),
  loading: Loading
})