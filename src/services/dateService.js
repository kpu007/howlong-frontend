import axios from 'axios'
const baseUrl = '/dates'

const getAll = () => {
  return axios.get(baseUrl)
}

const getArchivedDatesForDate = (date) => {
  const msDate = date.valueOf()

  return axios.get(baseUrl + "/archive/" + msDate)
}

/*
const getDateByName = (name) => {
  return axios.get(baseUrl + "/" + name)
}*/

export default {
  getAll,
  getArchivedDatesForDate
  //getDateByName
}
