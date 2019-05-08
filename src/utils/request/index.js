import axios from 'axios'
import {isPrd} from '../env'
import {API_BASE} from '../../../config'

export function GET(url, config = {}) {
  if (!url.includes('http')) {
    url = `${API_BASE}${url}`
  }

  // if (!isPrd) url += `?access_token=${window.localStorage.getItem('git_access_token')}`
  if (!isPrd) {
    url += url.includes('?') ? '&' : '?'

    url += 'client_id=1fd37dbf8bbc4d6bff18&client_secret=32828e0d61c494be7088d1f64a4b446951de0f77'
  }


  return axios.get(url, config)
}

export function POST(url, data, config) {
  if (!url.includes('http')) {
    url = `${API_BASE}${url}`
  }

  return axios.post(url, data, config)
}

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