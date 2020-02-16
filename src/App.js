import React from 'react';
import { Route, NavLink, Link, Switch } from 'react-router-dom';
import Navibar from './components/navibar/Navibar'
import Welcome from './components/welcome/Welcome';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navibar/>
        <Switch>
            <Route exact path='/' render={(props) => <Welcome {...props} user={null}/>}/>
          </Switch>
      </div>
    );
  }
}

export default App;
