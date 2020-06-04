import React, { useState, useEffect } from 'react';
import materialize from 'materialize-css';
import {
  translateRiskToEnglish,
  translateStausToEnglish,
} from '../../utils/translate';

// import { Container } from './styles';

function PopUpUpdateStatus({ patient, onStatusUpdateClick }) {
  const [statusData, setStatusData] = useState({
    risk: translateRiskToEnglish(patient.risk),
    status: translateStausToEnglish(patient.status),
  });

  useEffect(() => {
    const elemSelect = document.querySelectorAll('select');
    const elemModal = document.querySelectorAll('.modal');
    materialize.FormSelect.init(elemSelect);
    materialize.Modal.init(elemModal);
  }, []);

  function onChangeSelect(event) {
    setStatusData({
      ...statusData,
      [event.target.name]: event.target.value,
    });
  }
  return (
    <div className="modal" id="modal1">
      <div className="container">
        <div className="modal-content">
          <div className="col s12">
            <h1 className="title">Status do paciente</h1>
          </div>
        </div>
        <div className="row">
          <div class="input-field col s12 m6">
            <select
              value={statusData.risk}
              defaultChecked={statusData.risk}
              name="risk"
              onChange={onChangeSelect}
            >
              <option value="low">baixo</option>
              <option value="medium">médio</option>
              <option value="high">alto</option>
              <option value="critic">crítico</option>
            </select>
            <label>Estado de risco</label>
          </div>
        </div>
        <div className="row">
          <div class="input-field col s12">
            <select
              value={statusData.status}
              name="status"
              defaultChecked={statusData.status}
              onChange={onChangeSelect}
            >
              <option value="suspect">suspeito</option>
              <option value="monitored">monitorado</option>
              <option value="infected">infectado</option>
              <option value="discarded_by_isolation">
                descartado por tempo de isolamento
              </option>
              <option value="discarded_by_test">descartado por teste</option>
              <option value="cured">recuperado</option>
              <option value="death">óbito</option>
            </select>
            <label>Status</label>
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <button class="modal-close btn blue left">Cancelar</button>
          </div>
          <div className="col s6">
            <button
              onClick={() =>
                onStatusUpdateClick(statusData.status, statusData.risk)
              }
              class="modal-close btn waves-effect waves-green right"
            >
              Atualizar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopUpUpdateStatus;
