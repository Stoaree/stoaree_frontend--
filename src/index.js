import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from './routes/AppRouter.js';

// Redux 
import { store } from './redux/store.js';
import { Provider } from 'react-redux'

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Provider store={store}> <AppRouter /> </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
