import React, { useEffect } from 'react';
import questions from '../../utils/questios.json';
import Materialize from 'materialize-css';

// import { Container } from './styles';

function DailyReportPopUp({ checked, setChecked }) {
  useEffect(() => {
    let data = {};
    questions.map((question) => (data[question.value] = false));
    setChecked(data);
  }, [setChecked]);
  useEffect(() => {
    const elem = document.querySelectorAll('.modal');
    Materialize.Modal.init(elem);
  }, []);
  function handleChangeCheckbox(e) {
    setChecked({ ...checked, [e.target.name]: e.target.checked });
  }
  return (
    <div className="modal" id="modal2">
      <div className="modal-content">
        <div className="container">
          <div className="row">
            <div className="col s12">
              <h1 className="title">Sintomas do paciente</h1>
            </div>
          </div>
          <div className="row">
            {questions.map((question) => (
              <div key={question.id} className="col s12 m6">
                <p className="title">{question.label}</p>
                <div className="row">
                  <div className="switch col s12 m6">
                    <label>
                      Não
                      <input
                        type="checkbox"
                        name={question.value}
                        onChange={handleChangeCheckbox}
                      />
                      <span className="lever"></span>
                      Sim
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col s6">
              <button type="button" className="modal-close btn blue left">
                Concluído!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyReportPopUp;
