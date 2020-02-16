import React from 'react'
import { Button } from 'react-bootstrap'
import { getToken } from '../../utils/connection'

class Login extends React.Component {

    state = {
      name:'',
      password: ''
    }
  
  render() {
    return (
      <div>
        <div>
          <label>Username:</label>
          <input type="text" value={this.state.name} onChange={this.handleNameChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
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

  handleSubmit = () => {
    const { name, password } = this.state
    console.dir(process.env)
    getToken(name, password)
  }
}

export default Login
