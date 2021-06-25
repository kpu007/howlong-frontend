import axios from 'axios'
const baseUrl = '/dates'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getArchivedDatesForDate = (date) => {
  const msDate = date.valueOf()

  return axios.get(baseUrl + "/archive/" + msDate)
}

const attemptUpdate = async (password) => {
  const response = await axios.post(baseUrl + "/update", {"updateKey": password})
  return response
}

export default {
  getAll,
  getArchivedDatesForDate,
  attemptUpdate
}
