import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import questions from '../../utils/questios.json';
import {
  translateBooleanValue,
  translateStaus,
  translateRisk,
} from '../../utils/translate';
import { formatCpf, formatPhoneNumber } from '../../utils/formate';

// import { Container } from './styles';

function ReportShow({ patient }) {
  const [reportData, setReportData] = useState({});
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
      }
      const reportResponse = response.data.map(
        ({
          patient_id,
          id,
          name,
          cpf,
          phone_number,
          genre,
          status,
          risk,
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
              status: translateStaus(status),
              risk: translateRisk(risk),
            },
            report: {
              id,
              ...rest,
            },
          };
        }
      );
      setReportData(reportResponse);
    }
    loadReportData(patient.id, patient.symptoms_id);
  }, [patient, history]);

  if (!reportData[0]) {
    return (
      <div className="modal" id="modalReport">
        <div className="row">
          <div className="col s12">
            <h1 className="title">Carregando...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal" id="modalReport">
      <div className="container">
        <div className="row">
          <div className="col s12">
            <h1 className="title center">Sintomas do paciente</h1>
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
        <div className="row">
          <div className="col s12">
            <button class="modal-close btn waves-effect red right">
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportShow;
