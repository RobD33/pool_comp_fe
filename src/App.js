import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Navibar from './components/navibar/Navibar'
import Welcome from './components/welcome/Welcome';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import CreateGroup from './components/createGroup/CreateGroup';
import { validateToken } from './utils/connection';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.PureComponent {
  state = {
    user: {
      username: null,
      token: null
    },
    groups: [],
    selectedGroup: null
  }

  render() {
    return (
      <div className="App">
        <Navibar 
          {...this.props}
          logOut={this.logOut}
          user={this.state.user}
          loggedIn={this.loggedIn()}
          groups={this.state.groups}
          selectGroup={this.selectGroup}
        />
        <Switch>
            <Route exact path='/' render={(props) => <Welcome {...props} user={this.state.user}/>}/>
            <Route exact path='/login' render={(props) => <Login {...props} setUser={this.setUser}/>}/>
            <Route exact path='/signup' render={(props) => <Signup {...props} setUser={this.setUser}/>}/>
            <Route exact path='/groups/create-a-group' render={(props) => <CreateGroup {...props}/>}/>
          </Switch>
      </div>
    );
  }

  setUser = (user, rememberMe) => {
    this.setState({ user })
    if(rememberMe) {
      localStorage.setItem('on-the-baize', JSON.stringify(user))
    }
  }

  logOut = () => {
    const user = {
      username: null,
      token: null
    }
    this.setState({ user })
    localStorage.removeItem('on-the-baize')
  }

  loggedIn = () => {
    return this.state.user.username && this.valid()
  }

  valid = () => {
    const { username, token } = this.state.user
    if(username && token) {
      return validateToken(username, token)
    } else {
      return false
    }
  }

  selectGroup = (selectedGroup) => {
    this.setState({ selectedGroup })
  }

  componentDidMount = () => {
    const localStorageString = localStorage.getItem('on-the-baize')
    let user
    if(localStorageString){
      user = JSON.parse(localStorageString)
    }
    if(user){
      this.setState({user})
    }
  }
}

export default withRouter(App);
