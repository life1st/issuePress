export function getAccessToken() {
  const url = 'https://github.com/login/oauth/access_token'

  return axios.get(url, {
    params: {
      client_id: '1fd37dbf8bbc4d6bff18',
      client_secret: '32828e0d61c494be7088d1f64a4b446951de0f77',
      code: sessionStorage.getItem('git_code')
    }
  })
}