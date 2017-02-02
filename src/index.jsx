import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import store from './state/store';

// Render
render(
  <App />,
  document.querySelector('.mount')
);
