import {GET} from './index'

export function commits(owner, repo, author, since) {
  const url = `/repos/${owner}/${repo}/commits`

  return GET(url, {
    params: {
      author, since
    }
  })
}

export function repos(username) {
  const url = username ?
    `/users/${username}/repos` :
    '/users/repos'

    return GET(url)
}