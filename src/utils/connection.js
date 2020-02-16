import { get } from 'axios'
import { URL } from '../config/config'

const getToken = (username, password) => {
  get(`${URL}users`, { params: { username, password }})
    .then(response => console.log(response))
    .catch(error => console.log(error))
}

export { getToken }
