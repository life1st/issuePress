import axios from 'axios'
import {isPrd} from '../env'
import {API_BASE} from '../../../config'

export function GET(url, config = {}) {
  if (!url.includes('http')) {
    url = `${API_BASE}${url}`
  }

  if (!isPrd) url += `?access_token=${window.localStorage.getItem('git_access_token')}`

  return axios.get(url, config)
}

export function POST(url, data, config) {
  if (!url.includes('http')) {
    url = `${API_BASE}${url}`
  }

  return axios.post(url, data, config)
}