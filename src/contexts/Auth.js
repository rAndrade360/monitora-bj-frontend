import React, { createContext, useContext, useState, useEffect } from 'react';
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
        const myUser = JSON.parse(storedUser);
        setUser(myUser);
        setToken(storedToken);
        api.defaults.headers.common['authorization'] = storedToken;
        api.defaults.headers.common.strategy_id =
          myUser.permission === 'secretary' ? null : myUser.id;
      }
      setLoading(false);
    }
    loadStoredData();
  }, []);
  async function signIn({ access_id, password }) {
    let response;
    try {
      response = await api.post('/secretary/login', {
        access_id,
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
    api.defaults.headers.common.strategy_id =
      response.data.user.permission === 'secretary'
        ? null
        : response.data.user.id;
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
