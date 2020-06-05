import React, { useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import Materialize from 'materialize-css';
import './App.css';
import Routes from './routes';
import AuthProvider from './contexts/Auth';

function App() {
  useEffect(() => {
    Materialize.AutoInit();
  }, []);
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
