import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/configureStore';
// import './styles/index.css';
import './styles/home.css';
import App from './containers/App';
import { Provider } from 'react-redux';

const store = configureStore();

render((
    <BrowserRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </BrowserRouter>
), document.getElementById('root'));
