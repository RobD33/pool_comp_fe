import React from 'react';
import Button from 'react-bootstrap/Button';
import './welcome.css'

class Welcome extends React.Component {

    state = {
      user: null
    }
  

  render() {
    return (
      <div className='welcome'>
        <p1>Welcome</p1>
        <Button>Login</Button>
      </div>
    )
  }
}

export default Welcome
