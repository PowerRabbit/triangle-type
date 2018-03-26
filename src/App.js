import React, { Component } from 'react';
import './App.css';

import TriangleType from './Components/TriangleType/TriangleType.js'

class App extends Component {
  render() {
    return (
      <div className="App">        
        <section>
          <TriangleType />
        </section>        
      </div>
    );
  }
}

export default App;
