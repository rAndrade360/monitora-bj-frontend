import React, { createContext, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadStoredData() {
      const storedUser = localStorage.getItem('@AuthUser');
      const storedToken = localStorage.getItem('@AuthToken');
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
        api.defaults.headers.common['authorization'] = storedToken;
      }
      setLoading(false);
    }
    loadStoredData();
  }, []);
  async function signIn({ acess_id, password }) {
    let response;
    try {
      response = await api.post('/secretary/login', {
        acess_id,
        password,
      });
    } catch (error) {
      alert('Seu id ou senha estão incorretos! Por favor tente novamente.');
      return;
    }
    localStorage.setItem('@AuthUser', JSON.stringify(response.data.user));
    localStorage.setItem('@AuthToken', `Bearer ${response.data.token}`);
    setUser(response.data.user);
    setToken(`Bearer ${response.data.token}`);
    api.defaults.headers.common[
      'authorization'
    ] = `Bearer ${response.data.token}`;
    setLoading(false);
  }

  async function signOut() {
    setLoading(true);
    localStorage.clear();
    setUser(null);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <h1 className="title">Carregando...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, token, user, signIn, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
