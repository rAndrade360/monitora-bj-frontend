import React from 'react';
import { translateStausAndReturnColor } from '../../utils/translate';
import { formatCpf } from '../../utils/formate';

import './styles.css';

function ListItemPatient({ patient, handleShowPatient }) {
  const [status, color] = translateStausAndReturnColor(patient.status);
  const cpf = formatCpf(patient.cpf);
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
