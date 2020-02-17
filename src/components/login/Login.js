import React from 'react'
import { Button } from 'react-bootstrap'
import { getToken, validatePassword } from '../../utils/connections/users'

class Login extends React.Component {

    state = {
      username: '',
      password: '',
      rememberMe: true
    }
  
  render() {
    return (
      <div>
        <div>
          <label>Username:</label>
          <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
        </div>
        <div>
          <label>Remember me</label>
          <input type="checkbox" checked={this.state.rememberMe} onChange={this.handleRememberMeChange} />
        </div>
        <Button type='button' onClick={this.handleSubmit}>Log In</Button>
      </div>
    )
  }
  

  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  handleRememberMeChange = (e) => {
    this.setState({
      rememberMe: e.target.checked
    })
  }

  handleSubmit = () => {
    const { username, password, rememberMe } = this.state
    validatePassword(username, password)
      .then(valid => {
        if(valid) {
          getToken(username)
            .then(token => {
              const user = { username, token}
              this.props.setUser(user, rememberMe)
              this.props.history.push('/home')
            })
        }
      })
  }
}

export default Login
