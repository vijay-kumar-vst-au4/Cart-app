import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import *as firebase from 'firebase';
import 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAAlUfsprU6u31domCAqwbR6Y7eay25cfg",
    authDomain: "cart-a004a.firebaseapp.com",
    databaseURL: "https://cart-a004a.firebaseio.com",
    projectId: "cart-a004a",
    storageBucket: "cart-a004a.appspot.com",
    messagingSenderId: "617228619840",
    appId: "1:617228619840:web:e0ef327543704326308fa5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


ReactDOM.render(<App />, document.getElementById('root'));
