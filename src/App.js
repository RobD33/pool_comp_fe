import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navibar from './components/navibar/Navibar'
import Welcome from './components/welcome/Welcome';
import Login from './components/login/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navibar/>
        <Switch>
            <Route exact path='/' render={(props) => <Welcome {...props} user={null}/>}/>
            <Route exact path='/login' render={(props) => <Login {...props} user={null}/>}/>
          </Switch>
      </div>
    );
  }
}

export default App;
