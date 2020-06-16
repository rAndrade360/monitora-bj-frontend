import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { format, parse } from 'date-fns';
import api from '../../services/api';
import { formatCpf, formatPhoneNumber } from '../../utils/formate';
import {
  translateStaus,
  translateRisk,
  translateTestType,
  translateTestResult,
  translateFinalClassification,
} from '../../utils/translate';
import PopUpDelete from '../../components/PopUpDelete';
import UpdateTestDataPopUp from '../../components/UpdateTestDataPopUp';
import { useAuth } from '../../contexts/Auth';
import './styles.css';

// import { Container } from './styles';

function UserShow() {
  const [patientData, setPatientData] = useState({ conditions: [] });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { token, user } = useAuth();
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
      response.data.birthday = format(response.data.birthday, 'dd/MM/yyyy');
      response.data.screening_day = format(
        response.data.screening_day,
        'dd/MM/yyyy'
      );
      response.data.symptom_onset_date = format(
        response.data.symptom_onset_date,
        'dd/MM/yyyy'
      );
      response.data.status = translateStaus(response.data.status);
      response.data.risk = translateRisk(response.data.risk);
      response.data.collection_date = response.data.collection_date
        ? format(response.data.collection_date, 'dd/MM/yyyy')
        : '';
      setPatientData(response.data);
      setLoading(false);
    }
    loadPatientData(id);
  }, [id, token, user]);

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

  async function handleTestUpdate(testData) {
    testData.collection_date = parse(
      testData.collection_date,
      'dd/MM/yyyy',
      new Date()
    );
    testData.test_result = testData.test_result === 'positivo' ? true : false;
    const status = testData.status;
    testData.status = undefined;
    try {
      await api.put(
        `/patient/${patientData.id}/test/${patientData.test_id}`,
        { test_data: testData, status },
        {
          headers: {
            authorization: token,
          },
        }
      );
    } catch (error) {
      alert('Não foi possível alterar os dados!');
      return;
    }
    alert('Dados alterados com sucesso!');
    history.push(`/dashboard/patient/show/${patientData.id}`);
    window.location.reload();
  }

  if (loading) {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <h1 className="center title">Carregando...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <h1 className="center title">Dados do Paciente</h1>
        </div>
      </div>
      {user.permission !== 'test_center' ? (
        <>
          <div className="row">
            <div className="col s6 m4 left">
              <button
                className="btn green"
                onClick={() => {
                  updatePatient(id);
                }}
              >
                Alterar dados <i className="material-icons right">update</i>
              </button>
            </div>
            <div className="col s6 m4 right">
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
        </>
      ) : null}
      {user.permission !== 'basic_unity' ? (
        <div className="row">
          <div className="col s12 m4">
            <button className="btn blue modal-trigger" data-target="modalTest">
              Atualizar dados de teste{' '}
              <i className="material-icons right">science</i>
            </button>
            <UpdateTestDataPopUp
              testData={patientData}
              onStatusUpdateClick={handleTestUpdate}
            />
          </div>
        </div>
      ) : null}
      <div className="row">
        <div className="col s12">
          <h2 className="title">Dados Pessoais</h2>
          <div className="col s12 m6">
            <label>Nome:</label>
            <p>{patientData.name}</p>
          </div>
          <div className="col s12 m6">
            <label>Cpf:</label>
            <p>{patientData.cpf}</p>
          </div>
          <div className="col s12 m6">
            <label>Telefone:</label>
            <p>{patientData.phone_number}</p>
          </div>
          <div className="col s12 m6">
            <label>Sexo:</label>
            <p>{patientData.genre}</p>
          </div>
          <div className="col s12 m6">
            <label>Data de nascimento:</label>
            <p>{patientData.birthday}</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <h2 className="title">Dados de endereço</h2>
          <div className="col s12 m6">
            <label>Bairro:</label>
            <p>{patientData.address}</p>
          </div>
          <div className="col s12 m6">
            <label>Logradouro:</label>
            <p>{patientData.street}</p>
          </div>
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
      <div className="row">
        <div className="col s12">
          <h2 className="title">Dados de saúde</h2>
          <div className="col s12 m6">
            <label>Estado de risco:</label>
            <p>{patientData.risk}</p>
          </div>
          <div className="col s12 m6">
            <label>Status:</label>
            <p>{patientData.status}</p>
          </div>
          <div className="col s12 m6">
            <label>Data de triagem:</label>
            <p>{patientData.screening_day}</p>
          </div>
          <div className="col s12 m6">
            <label>Data de início dos sintomas:</label>
            <p>{patientData.symptom_onset_date}</p>
          </div>
          <div className="col s12 m6">
            <label>Doenças anteriores</label>
            <ul>
              {patientData.conditions.map((element, index) => (
                <li key={index}>{element.title}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <h2 className="title">Dados do teste</h2>
          <div className="col s12 m6">
            <label>Estado do teste:</label>
            <p>{patientData.test_status}</p>
          </div>
          <div className="col s12 m6">
            <label>Tipo:</label>
            <p>{translateTestType(patientData.test_type)}</p>
          </div>
          <div className="col s12 m6">
            <label>Resultado:</label>
            <p>{translateTestResult(patientData.test_result)}</p>
          </div>
          <div className="col s12 m6">
            <label>Classificação final:</label>
            <p>
              {translateFinalClassification(patientData.final_classification) ||
                'Não há dados'}
            </p>
          </div>
          <div className="col s12 m6">
            <label>Data de coleta:</label>
            <p>{patientData.collection_date || 'Não coletado'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserShow;
