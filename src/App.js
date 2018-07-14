import React, { Component } from 'react';
import SubredditForm from './SubredditForm';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>consciousreddit.com</h1>
        <SubredditForm fetchContent={stuff => console.log(stuff)} />
      </div>
    );
  }
}

export default App;
