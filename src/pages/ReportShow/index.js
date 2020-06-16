import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../../services/api';
import questions from '../../utils/questios.json';
import {
  translateBooleanValue,
  translateStaus,
  translateRisk,
} from '../../utils/translate';
import { formatCpf, formatPhoneNumber } from '../../utils/formate';
import PopUpUpdateStatus from '../../components/PopUpUpdateStatus';

// import { Container } from './styles';

function ReportShow() {
  const [reportData, setReportData] = useState({});
  const { patientId, reportId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadReportData(patient_id, report_id) {
      let response;
      try {
        response = await api.get(
          `/patient/dailyreport?patient=${patient_id}&reportId=${report_id}`
        );
      } catch (error) {
        alert('Não foi possível buscar os dados do relatório!');
        return history.push('/dailyreport');
      }
      const reportResponse = response.data.map(
        ({
          patient_id,
          id,
          name,
          cpf,
          phone_number,
          genre,
          screening_day,
          birthday,
          status,
          risk,
          created_at,
          ...rest
        }) => {
          Object.keys(rest).forEach((item) => {
            rest[item] = translateBooleanValue(rest[item]);
          });
          return {
            patient: {
              id: patient_id,
              name,
              cpf: formatCpf(cpf),
              phone_number: formatPhoneNumber(phone_number),
              genre,
              birthday: format(birthday, 'dd/MM/yyyy'),
              screening_day: format(screening_day, 'dd/MM/yyyy'),
              status: translateStaus(status),
              risk: translateRisk(risk),
            },
            report: {
              id,
              created_at,
              ...rest,
            },
          };
        }
      );
      setReportData(reportResponse);
    }
    loadReportData(patientId, reportId);
  }, [patientId, reportId, history]);

  async function onReadClick() {
    try {
      await api.post(`/patient/dailyreport/${reportData[0].report.id}/readed`);
    } catch (error) {
      alert('Não foi possível concluir a solicitação, verifique sua conexão!');
      return history.push('/dailyreport');
    }
    alert('O relatório foi marcado como lido!');
    history.push('/dailyreport');
  }

  async function onStatusUpdateClick(status, risk) {
    try {
      await api.put(`/patient/${reportData[0].patient.id}/status/update`, {
        status,
        risk,
      });
    } catch (error) {
      alert('Não foi possível atualizar o status!');
      return history.push('/dailyreport');
    }
    alert('O status do paciente foi atualizado com sucesso!');
    window.location.reload();
  }

  if (!reportData[0]) {
    return (
      <div className="row">
        <div className="col s12">
          <h1 className="title">Carregando...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <h1 className="title center">Relatório diário individual</h1>
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <p className="title center">
            {format(new Date(reportData[0].report.created_at), 'dd/MM/yyyy')}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col s6">
          <button onClick={() => onReadClick()} className="btn blue">
            Marcar como lido
          </button>
        </div>
        <div className="col s6">
          <button data-target="modal1" class="btn modal-trigger">
            Alterar status do paciente
          </button>
          <PopUpUpdateStatus
            patient={reportData[0].patient}
            onStatusUpdateClick={onStatusUpdateClick}
          />
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <h2 className="title">Dados pessoais</h2>
          <div className="row">
            <div className="row">
              <div className="col s12 m6">
                <div className="row">
                  <p>Nome</p>
                  <p>
                    <strong>{reportData[0].patient.name}</strong>
                  </p>
                </div>
              </div>
              <div className="col s12 m6">
                <div className="row">
                  <p>Cpf</p>
                  <p>
                    <strong>{reportData[0].patient.cpf}</strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m6">
                <div className="row">
                  <p>Data de Nascimento</p>
                  <p>
                    <strong>{reportData[0].patient.birthday}</strong>
                  </p>
                </div>
              </div>
              <div className="col s12 m6">
                <div className="row">
                  <p>Telefone</p>
                  <p>
                    <strong>{reportData[0].patient.phone_number}</strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m6">
                <div className="row">
                  <p>Status</p>
                  <p>
                    <strong>{reportData[0].patient.status}</strong>
                  </p>
                </div>
              </div>
              <div className="col s12 m6">
                <div className="row">
                  <p>Estado de risco</p>
                  <p>
                    <strong>{reportData[0].patient.risk}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <h1 className="title">Dados do relatório</h1>
        </div>
      </div>
      <div className="row">
        {questions.map((question) => (
          <div className="col s12 m6" key={question.id}>
            <div className="row">
              <p className="">{question.label}</p>
              <p className="">
                <strong>{reportData[0].report[question.value]}</strong>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReportShow;
