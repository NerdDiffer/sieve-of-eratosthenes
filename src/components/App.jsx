import React from 'react';
import SieveGrid from './Sieve.jsx';

const App = props => {
  return (
    <div className="app">
      <h1>Sieve of Eratosthenes</h1>
      <SieveGrid />
    </div>
  );
}

export default App;
