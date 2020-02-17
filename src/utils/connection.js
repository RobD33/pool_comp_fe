import { get, post } from 'axios'
import { compare } from './encrypt'
import { URL } from '../config/config'

const getToken = (username) => {
  return getUser(username)
          .then(response => response.data.token)
          .catch(error => console.log(error))
}

const getUsers = () => {
  return get(`${URL}users`)
          .then(response => response.data)
          .catch(error => console.log(error))
}

const createUser = (username, encrypted_password, email) => {
  return post(`${URL}users`, { params: {username, encrypted_password, email } })
          .then(response => response.data.token)
          .catch(error => console.log(error))
}

const validatePassword = (username, password) => {
  return getUser(username)
          .then(response => compare(password, response.data.encrypted_password))
          .catch(console.log)
}

const getUser = (username) => {
  return get(`${URL}users/${username}`)
}

const validateToken = (username, token) => {
  return getToken(username)
          .then(response => token === response)
}

export { getToken, getUsers, createUser, validatePassword, validateToken }
