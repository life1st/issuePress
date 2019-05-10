import {BLOG_CONFIG} from '../../../config'
import {GET, POST, PATCH} from './index'

const {username, reponame} = BLOG_CONFIG
export function getArticleList() {
  const url = `/repos/${username}/${reponame}/issues`

  return GET(url)
}

export function getArticle(issue_number) {
  const url = `/repos/${username}/${reponame}/issues/${issue_number}`

  return GET(url)
}

/**
 * payload: <object> {
 *    title: <string>,
 *    body: <string>,
 *    labels: <Array> [<string>]
 * }
 */
export function sendEditArticle(issue_number, payload) {
  if (!payload) return 

  const url = `/repos/${username}/${reponame}/issues/${issue_number}`

  return PATCH(url, payload)
}

export function sendNewAritcle(payload) {
  if (!payload) return 

  const url = `/repos/${username}/${reponame}/issues`

  return POST(url, payload)
}

export function deleteArticle() {

}


// comments
const commentUrl = (issue_number) => (`/repos/${username}/${reponame}/issues/${issue_number}/comments`)
export function getComments(issue_number) {
  return GET(commentUrl(issue_number))
}

/**
 * 
 * @param {number} issue_number 
 * @param {object} payload {
 *    body: {string}
 * }
 */
export function sendComment(issue_number, payload) {
  return POST(commentUrl(issue_number), payload)
}