import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../../services/api';
import { formatCpf, formatPhoneNumber } from '../../utils/formate';
import {
  translateGenre,
  translateStaus,
  translateRisk,
} from '../../utils/translate';
import PopUpDelete from '../../components/PopUpDelete';
import { useAuth } from '../../contexts/Auth';

// import { Container } from './styles';

function UserShow() {
  const [patientData, setPatientData] = useState({});
  const { id } = useParams();
  const { token } = useAuth();
  const history = useHistory();

  useEffect(() => {
    async function loadPatientData(patientId) {
      const response = await api.get(`/patient/${patientId}/show`, {
        headers: {
          authorization: token,
        },
      });
      response.data.cpf = formatCpf(response.data.cpf);
      response.data.phone_number = formatPhoneNumber(
        response.data.phone_number
      );
      response.data.genre = translateGenre(response.data.genre);
      response.data.birthday = format(response.data.birthday, 'dd/MM/yyyy');
      response.data.screening_day = format(
        response.data.screening_day,
        'dd/MM/yyyy'
      );
      response.data.status = translateStaus(response.data.status);
      response.data.risk = translateRisk(response.data.risk);
      setPatientData(response.data);
    }
    loadPatientData(id);
  }, [id, token]);

  async function deletePatient(patientId) {
    try {
      await api.delete(`/patient/${patientId}/delete`, {
        headers: {
          authorization: token,
        },
      });
    } catch (err) {
      history.push(`/dashbard/patient/show/${patientId}`);
      return alert('Não foi possível deletar o paciente');
    }
    alert('Paciente deletado com sucesso!');
    history.push('/dashbard/patients');
  }

  function updatePatient(patientId) {
    history.push(`/dashboard/patient/update/${patientId}`);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <h1 className="center title">Dados do Paciente</h1>
        </div>
      </div>
      <div className="row">
        <div className="col s4 left">
          <button
            className="btn green"
            onClick={() => {
              updatePatient(id);
            }}
          >
            Alterar dados <i className="material-icons right">update</i>
          </button>
        </div>
        <div className="col s4 right">
          <PopUpDelete
            trigger={
              <button className="btn red">
                Deletar dados <i className="material-icons right">delete</i>
              </button>
            }
            patient={patientData}
            patientDelete={deletePatient}
          />
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <h2 className="title">Dados Pessoais</h2>
          <div className="row">
            <div className="col s12 m6">
              <label>Nome:</label>
              <p>{patientData.name}</p>
            </div>
            <div className="col s12 m6">
              <label>Cpf:</label>
              <p>{patientData.cpf}</p>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m6">
              <label>Telefone:</label>
              <p>{patientData.phone_number}</p>
            </div>
            <div className="col s12 m6">
              <label>Sexo:</label>
              <p>{patientData.genre}</p>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m6">
              <label>Data de nascimento:</label>
              <p>{patientData.birthday}</p>
            </div>
            <div className="col s12 m6">
              <label>Data de triagem:</label>
              <p>{patientData.screening_day}</p>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m6">
              <label>Estado de risco:</label>
              <p>{patientData.risk}</p>
            </div>
            <div className="col s12 m6">
              <label>Status:</label>
              <p>{patientData.status}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <h2 className="title">Dados de endereço</h2>
          <div className="row">
            <div className="col s12 m6">
              <label>Bairro:</label>
              <p>{patientData.address}</p>
            </div>
            <div className="col s12 m6">
              <label>Logradouro:</label>
              <p>{patientData.street}</p>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m6">
              <label>Número</label>
              <p>{patientData.number}</p>
            </div>
            <div className="col s12 m6">
              <label>Complemento</label>
              <p>{patientData.complement}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserShow;
