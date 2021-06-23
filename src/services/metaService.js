import axios from 'axios'
const baseUrl = '/meta'

const getFirstArchivedDate = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data.firstArchivedDate)
}
const getLastUpdated = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data.lastUpdated)
}
export default {
  getFirstArchivedDate,
  getLastUpdated
}
