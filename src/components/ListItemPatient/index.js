import React, { useEffect, useState } from 'react';
import { differenceInDays, parseISO } from 'date-fns';
import { translateStausAndReturnColor } from '../../utils/translate';
import { formatCpf } from '../../utils/formate';

import './styles.css';

function ListItemPatient({ patient, handleShowPatient }) {
  const [days, setDays] = useState({ days: '', color: '' });
  useEffect(() => {
    const daysCount = differenceInDays(
      new Date(),
      parseISO(patient.symptom_onset_date)
    );
    patient.test_status === 'solicitado'
      ? daysCount >= 10
        ? setDays({ days: `${daysCount} dias`, color: '#F58989' })
        : setDays({ days: `${daysCount} dias`, color: '#89FFA2' })
      : setDays({ days: `Teste já ${patient.test_status}`, color: '#FFF' });
  }, [patient]);
  const [status, color] = translateStausAndReturnColor(patient.status);
  const cpf = formatCpf(patient.cpf) || 'Não informado';
  return (
    <tr>
      <td>{patient.name}</td>
      <td>{cpf}</td>
      <td>
        <p className="bg-styled" style={{ backgroundColor: color }}>
          {status}
        </p>
      </td>
      <td>
        <p className="bg-styled" style={{ backgroundColor: days.color }}>
          {days.days}
        </p>
      </td>
      <td>
        <button
          className="btn blue"
          onClick={() => handleShowPatient(patient.id)}
        >
          <i className="material-icons">search</i>
        </button>
      </td>
    </tr>
  );
}

export default ListItemPatient;
