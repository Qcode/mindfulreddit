import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Main from './Main';
import About from './About';
import './App.css';

function App(props) {
  return (
    <div className="App">
      <h1 className="App-header">
        mindful<span className="red">reddit</span>
      </h1>
      <Switch>
        <Route
          exact
          path="/about"
          component={() => <About ReactGA={props.ReactGA} />}
        />
        <Route component={() => <Main ReactGA={props.ReactGA} />} />
      </Switch>
    </div>
  );
}

App.propTypes = {
  ReactGA: PropTypes.shape({ pageview: PropTypes.func }).isRequired,
};

export default App;
