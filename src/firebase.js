import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyC_JzjsmDFHPc-P8uBp8l3S9gXdZgQhVoI',
  authDomain: 'wheres-waldo-e3fac.firebaseapp.com',
  projectId: 'wheres-waldo-e3fac',
  storageBucket: 'wheres-waldo-e3fac.appspot.com',
  messagingSenderId: '575836010965',
  appId: '1:575836010965:web:34ddd5af28b939f0ef655c',
};

function firebase() {
  initializeApp(firebaseConfig);
}

export default firebase;
