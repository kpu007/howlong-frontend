import axios from 'axios'
const baseUrl = 'http://localhost:3001/dates'

const getAll = () => {
  return axios.get(baseUrl)
}

/*
const getDateByName = (name) => {
  return axios.get(baseUrl + "/" + name)
}*/

export default {
  getAll
  //getDateByName
}
