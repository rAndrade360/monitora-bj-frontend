import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api.js';
import { translateStrategyType } from '../../utils/translate';

function StrategyList() {
  const [strategies, setStrategies] = useState([]);
  const history = useHistory();
  useEffect(() => {
    async function loadStrategies() {
      let response;
      try {
        response = await api.get('/strategies');
      } catch (error) {
        if (error.response.status === 401) {
          alert('Você não tem autorização para realizar esse tipo de ação!');
          history.push('/dashboard');
        }
        return;
      }
      setStrategies(response.data);
    }
    loadStrategies();
  }, [history]);
  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <h1 className="title center">Estratégias</h1>
        </div>
        <div className="row">
          <table>
            <thead className="highlight centered responsive-table">
              <tr>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Id de acesso</th>
              </tr>
            </thead>
            <tbody>
              {strategies.map((strategy) => (
                <tr>
                  <td>{strategy.name}</td>
                  <td>{translateStrategyType(strategy.permission)}</td>
                  <td>{strategy.access_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StrategyList;
