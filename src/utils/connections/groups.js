import { get, post } from 'axios'
import { URL } from '../../config/config'

const createGroup = (name, description, privacy) => {
  return post(`${URL}groups`, { params: { name, description, privacy } })
          .then(response => console.log(response))
          .catch(console.log)
}

const getGroups = () => {
  return get(`${URL}groups`)
          .then(response => response.data)
          .catch(console.log)
}

export { createGroup, getGroups }
