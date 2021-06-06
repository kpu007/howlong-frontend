import axios from 'axios'
const baseUrl = 'http://localhost:3001/meta'

const getMeta = () => {
  return axios.get(baseUrl)
}

export default {
  getMeta
}
