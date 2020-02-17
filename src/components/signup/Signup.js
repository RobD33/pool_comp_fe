import React from 'react'
import { Button } from 'react-bootstrap'
import { getUsers, createUser } from '../../utils/connection'
import { encrypt } from '../../utils/encrypt'

class Login extends React.Component {

    state = {
      username:'',
      password: '',
      confirmPassword: '',
      email: '',
      matchPassword: true,
      users:[],
      loadedUsers: true,
      uniqueName: true
    }
  
  render() {
    return (
      <div>
        <div>
          <label>Username:</label>
          <input type="text" value={this.state.username} onChange={this.handleNameChange} />
          {!this.state.uniqueName && <label>Username is taken</label>}
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
        </div>
        <div>
          <label>Confirm password:</label>
          <input type="password" value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange} />
          {!this.state.matchPassword && <label>Password doesn't match!</label>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={this.state.email} onChange={this.handleEmailChange} />
        </div>
        <Button type='button' onClick={this.handleSubmit}>Log In</Button>
      </div>
    )
  }
  

  handleNameChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  handleConfirmPasswordChange = (e) => {
    this.setState({
      confirmPassword: e.target.value
    })
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  handleSubmit = () => {
    const { 
      username,
      password,
      email,
      matchPassword,
      uniqueName,
      loadedUsers
    } = this.state
    this.checkMatch()
    this.checkUsername()
    if (matchPassword && loadedUsers && uniqueName) {
      encrypt(password).then(encryptedPassword => {
        createUser(username, encryptedPassword, email)
          .then(token => {
            const user = { username, token }
            this.props.setUser(user)
          })
      })
    }
  }

  checkMatch = () => {
    const { password, confirmPassword } = this.state
    const matchPassword = password === confirmPassword
    this.setState({ matchPassword })
  }

  checkUsername = () => {
    const uniqueName = !this.state.users.includes(this.state.username)
    this.setState({ uniqueName })
  }

  componentDidMount = () => {
    getUsers().then(users => {
      const loadedUsers = true
      this.setState({ users, loadedUsers })
    })
  }
}

export default Login
