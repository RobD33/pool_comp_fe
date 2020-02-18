import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Navibar from './components/navibar/Navibar'
import Welcome from './components/welcome/Welcome';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import CreateGroup from './components/createGroup/CreateGroup';
import { validateToken } from './utils/connections/users';
import { getUserGroups } from './utils/connections/userGroups'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.PureComponent {
  state = {
    user: {
      username: null,
      token: null
    },
    userGroups: [],
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
          userGroups={this.state.userGroups}
          selectGroup={this.selectGroup}
        />
        <Switch>
          <Route exact path='/' render={(props) => <Welcome {...props} user={this.state.user}/>}/>
          <Route exact path='/login' render={(props) => <Login {...props} setUser={this.setUser}/>}/>
          <Route exact path='/signup' render={(props) => <Signup {...props} setUser={this.setUser}/>}/>
          <Route exact path='/create-a-group' render={(props) => <CreateGroup {...props} selectGroup={this.selectGroup}/>}/>
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
    const { username, token } = this.state.user
    return username && this.valid(username, token)
  }

  valid = (username, token) => {
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
    if(localStorageString) {
      let { username, token } = JSON.parse(localStorageString)
      this.valid(username, token)
        .then(valid => {
          if (valid) {
            const user = { username, token }
            this.setState({ user })
            getUserGroups(username)
              .then(userGroups => {
                if(userGroups) this.setState({ userGroups })
              })
          }
        })
    }
  }
}

export default withRouter(App);
