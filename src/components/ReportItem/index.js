import React from 'react';

// import { Container } from './styles';

function ReportItem({ reportData, handleShowReport }) {
  return (
    <>
      <tr>
        <td>{reportData.patient.name}</td>
        <td>{reportData.patient.cpf}</td>
        <td>{reportData.patient.status}</td>
        <td>{reportData.patient.risk}</td>
        <td>{reportData.report.created_at}</td>
        <td>
          <button
            onClick={() =>
              handleShowReport(reportData.patient.id, reportData.report.id)
            }
            className="btn blue"
          >
            Abrir
          </button>
        </td>
      </tr>
    </>
  );
}

export default ReportItem;
