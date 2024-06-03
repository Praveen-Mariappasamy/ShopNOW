// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBqIt7SFYZLeQeJJEFQU9v5tEdvE2uJRA0",
    authDomain: "booksearch-2493c.firebaseapp.com",
    projectId: "booksearch-2493c",
    storageBucket: "booksearch-2493c.appspot.com",
    messagingSenderId: "598221723846",
    appId: "1:598221723846:web:8c61cb7af2bffcc2e01fc7",
    measurementId: "G-2YBLLBTJ78"
  };

  // Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Get Firebase Storage instance
const storage = getStorage(firebaseApp);


export {storage};
