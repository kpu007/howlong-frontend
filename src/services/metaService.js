import axios from 'axios'
const baseUrl = '/meta'

const getMeta = () => {
  return axios.get(baseUrl)
}

export default {
  getMeta
}
