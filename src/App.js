import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UpdatableCloropleth from './UpdatableCloropleth'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">

          <h1 className="App-title">Multidimensional Povery Index Visualization</h1>
        </header>
		http://ophi.org.uk/multidimensional-poverty-index/
		
		<UpdatableCloropleth/>
      </div>
    );
  }
}

export default App;
