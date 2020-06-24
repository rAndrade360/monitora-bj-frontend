import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import api from '../../services/api';
import { useAuth } from '../../contexts/Auth';
import ListItem from '../../components/ListItemPatient';
import fetchStrategies from '../../utils/fetchStrategies';
import InputMask from 'react-input-mask';
import { parse } from 'date-fns';

import './styles.css';

function UserSearch() {
  const [patients, setPatients] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [patientName, setPatientName] = useState('');
  const [strategies, setStrategies] = useState({
    strategies: [],
    selected: null,
  });
  const [filter, setFilter] = useState({
    status: '',
    date: '',
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
    async (paginate = 1, selected = undefined, name = '', status, date) => {
      const response = await api.get(`/patients`, {
        headers: {
          strategy_id: selected || api.defaults.headers.common.strategy_id,
        },
        params: {
          page: paginate,
          name,
          status,
          date:
            date && date.length === 10
              ? parse(date, 'dd/MM/yyyy', new Date())
              : undefined,
        },
      });
      setPatients(response.data);
      setPageCount(response.headers['x-total-count']);
      setLoading(false);
    },
    []
  );

  function handleChangeStrategy(e) {
    setStrategies({
      ...strategies,
      selected: e.target.value,
    });
  }

  function onChangeFilter(e) {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    getPatients(page);
  }, [getPatients, page]);
  function handleChangePage(pageNumber) {
    history.push(`/dashboard/patients/${pageNumber}`);
  }
  function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    getPatients(
      page,
      strategies.selected,
      patientName,
      filter.status,
      filter.date
    );
    setPatientName('');
  }

  function handleShowPatient(patientId) {
    history.push(`/dashboard/patient/${patientId}/show`);
  }

  if (loading) {
    return <div></div>;
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
              <div className="row">
                <h2 className="filter-title">Filtros</h2>
                {strategies.strategies.length > 0 ? (
                  <div className="col s12 m4">
                    <label>Selecione a UBS*</label>
                    <select
                      value={strategies.selected}
                      name="genre"
                      className="browser-default"
                      onChange={handleChangeStrategy}
                    >
                      <option value={null}>Todo o município</option>
                      {strategies.strategies.map((strategy) => (
                        <option key={strategy.id} value={strategy.id}>
                          {strategy.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}
                <div className="col s12 m4">
                  <label>Selecione o status*</label>
                  <select
                    value={filter.status}
                    name="status"
                    className="browser-default"
                    onChange={onChangeFilter}
                  >
                    <option value="">Todos os status</option>
                    <option value="suspeito">suspeito</option>
                    <option value="internado">internado</option>
                    <option value="descartado_por_isolamento">
                      descartado por tempo de isolamento
                    </option>
                    <option value="descartado_por_teste">
                      descartado por teste
                    </option>
                    <option value="em_tratamento_domiciliar">
                      em tratamento domiciliar
                    </option>
                    <option value="internado_em_uti">internado em UTI</option>
                    <option value="ignorado">ignorado</option>
                    <option value="cancelado">cancelado</option>
                    <option value="curado">recuperado</option>
                    <option value="obito">óbito</option>
                  </select>
                </div>
                <div className="col s12 m4">
                  <label htmlFor="date">Data de cadastro*</label>
                  <InputMask
                    id="date"
                    name="date"
                    type="text"
                    mask="99/99/9999"
                    className="validate"
                    value={filter.date}
                    onChange={onChangeFilter}
                  />
                </div>
              </div>
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
              totalItemsCount={parseInt(pageCount)}
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
