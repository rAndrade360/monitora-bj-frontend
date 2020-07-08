import React, { useEffect } from 'react';
import questions from '../../utils/questios.json';
import materialize from 'materialize-css';

// import { Container } from './styles';

function ReportShow({ reportData }) {
  useEffect(() => {
    const elemModal = document.querySelectorAll('.modal');
    materialize.Modal.init(elemModal);
  }, []);

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
                  <strong>
                    {reportData[0].report[question.value] ? 'Sim' : 'Não'}
                  </strong>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col s12">
            <button className="modal-close btn waves-effect red right">
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportShow;
