import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';

const renderApp=Routes=> {
  ReactDOM.render(
  <Routes />, document.querySelector('.container--'));
}

renderApp(Routes);

if (module.hot) {
  module.hot.accept('./routes', () => {
    const newRoutes = require('./routes').default;
  renderApp(newRoutes);
});
}