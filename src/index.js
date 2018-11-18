import React from 'react';
import { hydrate, render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import store from './store';
import { getStrings } from './actions';
import './index.css';
import App from './components/App';
// import { unregister } from './common/serviceWorker';

const history = createHistory();
const rootElement = document.getElementById('root');

store.dispatch(getStrings());

const app = (
  <Provider store={store}>
    <Router history={history}>
      <Route component={App} />
    </Router>
  </Provider>
);

if (rootElement.hasChildNodes()) {
  render(app, rootElement);
} else {
  hydrate(app, rootElement);
}

// unregister();
