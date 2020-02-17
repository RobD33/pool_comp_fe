import React from 'react'
import { Button } from 'react-bootstrap'
import { getUsers, createUser } from '../../utils/connection'
import { encrypt } from '../../utils/encrypt'

class Login extends React.Component {

    state = {
      name:'',
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
          <input type="text" value={this.state.name} onChange={this.handleNameChange} />
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
      name: e.target.value
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
      name,
      password,
      email,
      matchPassword,
      uniqueName,
      loadedUsers
    } = this.state
    this.checkMatch()
    this.checkName()
    if (matchPassword && loadedUsers && uniqueName) {
      encrypt(password).then(encryptedPassword => {
        createUser(name, encryptedPassword, email)
      })
    }
  }

  checkMatch = () => {
    const { password, confirmPassword } = this.state
    const matchPassword = password === confirmPassword
    this.setState({ matchPassword })
  }

  checkName = () => {
    const uniqueName = !this.state.users.includes(this.state.name)
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
