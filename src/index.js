import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';

import App from './App';

const firebaseConfig = {
  apiKey: 'AIzaSyDY-waWpffB6Zr1IepssFXbHCopTDOQfrE',
  authDomain: 'test-todo-app-eea6d.firebaseapp.com',
  databaseURL: 'https://test-todo-app-eea6d.firebaseio.com',
  projectId: 'test-todo-app-eea6d',
  storageBucket: 'test-todo-app-eea6d.appspot.com',
  messagingSenderId: '776816832719'
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));
