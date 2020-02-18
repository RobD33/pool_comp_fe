import { get, post } from 'axios'
import { URL } from '../../config/config'

const getUserGroups = (username) => {
  return get(`${URL}user_groups/`, { params: { username } })
    .then(response => response.data)
    .catch(console.log)
}

const addUserToGroup = (username, name) => {
  post(`${URL}user_groups`, { params: { username, name } })
    .then(response => console.log(response))
    .catch(console.log)
}
export { getUserGroups, addUserToGroup }
