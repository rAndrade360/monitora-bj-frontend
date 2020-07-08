import React from 'react';
import Popup from 'reactjs-popup';
// import { Container } from './styles';

function PopUpDelete({ trigger, patient, patientDelete }) {
  return (
    <Popup trigger={trigger} modal closeOnDocumentClick position="right center">
      {(close) => (
        <div className="row">
          <div className="col s12">
            <div className="row">
              <div className="col s12">
                <h1 className="title center">
                  Deseja mesmo deletar o paciente com os seguintes dados?
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <label>Nome:</label>
                <p>{patient.name}</p>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <label>Cpf:</label>
                <p>{patient.cpf}</p>
              </div>
            </div>
            <div className="row">
              <div className="col s6">
                <button className="btn blue left" onClick={() => close()}>
                  Cancelar
                </button>
              </div>
              <div className="col s6">
                <button
                  className="btn red right"
                  onClick={() => patientDelete(patient.id)}
                >
                  Deletar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default PopUpDelete;
