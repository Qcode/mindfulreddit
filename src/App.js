import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './Main';
import About from './About';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="App-header">
          mindful<span className="red">reddit</span>
        </h1>
        <Switch>
          <Route exact path="/about" component={About} />
          <Route component={Main} />
        </Switch>
      </div>
    );
  }
}

export default App;
