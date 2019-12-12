import React, { Component } from 'react';
import Table from './Table.js';
import './App.css'
import MetaTags from 'react-meta-tags';


class App extends Component {

  render () {
    return (   
      <div className="App">
      <MetaTags>
          <title>Trash: The Card Game</title>
      </MetaTags>           
        <Table />
      </div>
    );
  }
}

export default App;
