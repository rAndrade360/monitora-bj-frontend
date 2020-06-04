import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import api from '../../services/api';
import ListItem from '../../components/ListItemPatient';

function UserSearch() {
  const [patients, setPatients] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [patientName, setPatientName] = useState('');
  const { page } = useParams();
  const history = useHistory();

  async function getPatients(paginate = 1, name = '') {
    const response = await api.get(`/patients?page=${paginate}&name=${name}`);
    setPatients(response.data.patient);
    setPageCount(response.data.count[0]['count(*)'] || 1);
  }

  useEffect(() => {
    getPatients(page);
  }, [page]);
  function handleChangePage(pageNumber) {
    history.push(`/dashboard/patients/${pageNumber}`);
  }
  function handleSearch(e) {
    e.preventDefault();
    getPatients(page, patientName);
    setPatientName('');
  }

  function handleShowPatient(patientId) {
    history.push(`/dashboard/patient/show/${patientId}`);
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
