import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import fetchStrategies from '../../utils/fetchStrategies';
import { translateStrategyType } from '../../utils/translate';

function StrategyList() {
  const [strategies, setStrategies] = useState([]);
  const history = useHistory();
  useEffect(() => {
    async function loadStrategies() {
      const response = await fetchStrategies(history);
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
              {strategies.map((strategy, key) => (
                <tr key={key}>
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
