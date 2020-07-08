import api from '../services/api';
import {
  translateBooleanValue,
  translateStaus,
  translateRisk,
} from './translate';
import { formatCpf, formatPhoneNumber } from './formate';

export default async function loadReportData(patient_id, report_id) {
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
      birthday,
      screening_day,
      created_at,
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
          birthday,
          screening_day,
          created_at,
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
  return reportResponse;
}
