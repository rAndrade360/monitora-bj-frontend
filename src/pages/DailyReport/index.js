import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';
import ReportItem from '../../components/ReportItem';
import { useAuth } from '../../contexts/Auth';
import api from '../../services/api';
import {
  translateGenre,
  translateStaus,
  translateRisk,
  translateBooleanValue,
} from '../../utils/translate';

// import { Container } from './styles';

function DailyReport() {
  const [reports, setReports] = useState([]);
  const { token } = useAuth();
  const history = useHistory();

  async function loadReports() {
    let response;
    try {
      response = await api.get('/patient/dailyreport');
    } catch (error) {
      return;
    }

    const reportResponse = response.data.map((
      {
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
            cpf,
            phone_number,
            genre: translateGenre(genre),
            birthday: format(birthday, 'dd/MM/yyyyy'),
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
    });
    setReports(reportResponse);
  }
  useEffect(() => {
    loadReports();
    const interval = setInterval(() => {
      loadReports();
    }, 20000);
    return () => clearInterval(interval);
  }, [token]);

  function handleShowReport(patientId, reportId) {
    history.push(`/dailyreport/${patientId}/${reportId}`);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <h1 className="title center">Relatórios diários</h1>
        </div>
      </div>
      <div className="row">
        <div className="row">
          <div className="col s12">
            <h2 className="title">Relatórios não lidos</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <table className="highlit responsive-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Cpf</th>
                <th>Status</th>
                <th>Risco</th>
                <th>Data de criação</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <ReportItem
                  reportData={report}
                  handleShowReport={handleShowReport}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DailyReport;
