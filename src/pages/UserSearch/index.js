import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import api from '../../services/api';
import { useAuth } from '../../contexts/Auth';
import ListItem from '../../components/ListItemPatient';
import fetchStrategies from '../../utils/fetchStrategies';
import { useCallback } from 'react';

function UserSearch() {
  const [patients, setPatients] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [patientName, setPatientName] = useState('');
  const [strategies, setStrategies] = useState({
    strategies: [],
    selected: null,
  });
  const { user } = useAuth();
  const { page } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadStrategies() {
      if (user.permission === 'secretary') {
        const response = await fetchStrategies(history);
        const newData = response.data.filter(
          (res) => res.permission === 'basic_unity'
        );
        setStrategies({
          strategies: response.status === 200 ? newData : [],
          selected: null,
        });
      }
    }
    loadStrategies();
  }, [history, user.permission]);

  const getPatients = useCallback(
    async (paginate = 1, selected = null, name = '') => {
      const response = await api.get(
        `/patients?page=${paginate}&name=${name}`,
        {
          headers: {
            strategy_id: selected || api.defaults.headers.common.strategy_id,
          },
        }
      );
      setPatients(response.data.patient);
      setPageCount(response.data.count[0]['count(*)'] || 1);
    },
    []
  );

  function handleChangeStrategy(e) {
    setStrategies({
      ...strategies,
      selected: e.target.value,
    });
  }

  useEffect(() => {
    getPatients(page);
  }, [getPatients, page]);
  function handleChangePage(pageNumber) {
    history.push(`/dashboard/patients/${pageNumber}`);
  }
  function handleSearch(e) {
    e.preventDefault();
    getPatients(page, strategies.selected, patientName);
    setPatientName('');
  }

  function handleShowPatient(patientId) {
    history.push(`/dashboard/patient/${patientId}/show`);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <div className="row">
            <div className="col s12">
              <h1 className="title center">Buscar Pacientes</h1>
            </div>
          </div>

          <div className="row">
            <form className="col s12" onSubmit={handleSearch}>
              <div className="row">
                <div className="col s12">
                  <input
                    placeholder="Busque um paciente pelo nome"
                    id="filter_by_name"
                    type="text"
                    className="validate"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                  />
                  <label htmlFor="filter_by_name">Filtrar pelo nome</label>
                </div>
              </div>
              {strategies.strategies.length > 0 ? (
                <div className="row">
                  <div className="col s12 m6">
                    <label>Selecione a UBS*</label>
                    <select
                      value={strategies.selected}
                      name="genre"
                      className="browser-default"
                      onChange={handleChangeStrategy}
                    >
                      {console.log(strategies)}
                      <option value={null}>Todo o município</option>
                      {strategies.strategies.map((strategy) => (
                        <option key={strategy.id} value={strategy.id}>
                          {strategy.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : null}
              <div className="row">
                <div className="col s12">
                  <button className="btn blue right" type="submit">
                    Buscar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="row">
          <div className="col s12">
            <h2 className="title center">Lista de Pacientes</h2>
          </div>
        </div>
        <table className="highlight centered responsive-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Status</th>
              <th>Tempo aguardando teste</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <ListItem
                key={patient.cpf}
                handleShowPatient={handleShowPatient}
                patient={patient}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="row">
        <div className="row">
          <div className="col s12">
            <Pagination
              activePage={parseInt(page)}
              itemsCountPerPage={20}
              totalItemsCount={pageCount}
              pageRangeDisplayed={5}
              onChange={handleChangePage}
              innerClass="pagination center"
              activeClass="active"
              itemClass="waves-effect"
              activeLinkClass="blue"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSearch;
