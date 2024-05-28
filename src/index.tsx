import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { places } from './mocks/offers';
import { store } from './store';
import { Provider } from 'react-redux';
import { fetch as fetchPlace } from './store/api-action';

store.dispatch(fetchPlace());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App places={places} type={'cities'}/>
    </Provider>

  </React.StrictMode>
);
