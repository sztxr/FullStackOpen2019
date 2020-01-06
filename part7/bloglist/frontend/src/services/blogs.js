import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getConfig = () => ({ headers: { Authorization: token } })

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, getConfig())
  return response.data
}

const update = async objectToUpdate => {
  const response = await axios.put(`${baseUrl}/${objectToUpdate.id}`, objectToUpdate, getConfig())
  return response.data
}

const remove = async objectToDelete => {
  const response = await axios.delete(`${baseUrl}/${objectToDelete.id}`, getConfig())
  return response.data
}

export default { getAll, create, update, remove, setToken }