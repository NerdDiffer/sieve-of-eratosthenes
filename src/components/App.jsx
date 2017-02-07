import React from 'react';
import SieveGrid from './Sieve';

const App = props => {
  return (
    <div className="app">
      <h1>Sieve of Eratosthenes</h1>
      <SieveGrid n={100} ms={500} />
    </div>
  );
}

export default App;
