import React, { useState, useEffect, useRef } from 'react';
import materialize from 'materialize-css';
import { Form } from '@unform/web';
import Input from '../Input';
import { translateTestResult } from '../../utils/translate';
import i18n from '../../utils/i18n';

// import { Container } from './styles';

function UpdateTestDataPopUp({ testData, onStatusUpdateClick }) {
  const [statusData, setStatusData] = useState({
    test_status: testData.test_status,
    test_type: testData.test_type,
    test_result: translateTestResult(testData.test_result),
    final_classification: testData.final_classification || 'nao_definido',
    status: testData.status,
  });
  const formRef = useRef(null);
  useEffect(() => {
    const elemSelect = document.querySelectorAll('select');
    const elemsDatetime = document.querySelectorAll('.datepicker');
    const elemModal = document.querySelectorAll('.modal');
    materialize.FormSelect.init(elemSelect);
    materialize.Modal.init(elemModal);
    materialize.Datepicker.init(elemsDatetime, { i18n, format: 'dd/mm/yyyy' });
  }, []);

  function handleSubmit(data) {
    const newData = {
      ...statusData,
      collection_date: data.collection_date,
    };
    onStatusUpdateClick(newData);
    setStatusData(newData);
  }

  function onChangeSelect(event) {
    setStatusData({
      ...statusData,
      [event.target.name]: event.target.value,
    });
  }
  return (
    <div className="modal" id="modalTest">
      <div className="container">
        <div className="modal-content">
          <div className="col s12">
            <h1 className="title">Informações de teste</h1>
          </div>
        </div>
        <Form
          ref={formRef}
          initialData={{ collection_date: testData.collection_date || '' }}
          onSubmit={handleSubmit}
        >
          <div className="row">
            <div className="input-field col s12">
              <select
                value={statusData.test_status}
                defaultChecked={statusData.test_status}
                name="test_status"
                onChange={onChangeSelect}
              >
                <option value="solicitado">solicitado</option>
                <option value="coletado">coletado</option>
                <option value="concluido">concluído</option>
              </select>
              <label>Estado de teste</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <select
                value={statusData.test_type}
                name="test_type"
                defaultChecked={statusData.test_type}
                onChange={onChangeSelect}
              >
                <option value="suspect">teste rápido - anticorpo</option>
                <option value="monitored">teste rápido - antígeno</option>
                <option value="rt_pcr">RT - PCR</option>
              </select>
              <label>Tipo do teste</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <select
                value={statusData.test_result}
                name="test_result"
                defaultChecked={statusData.test_result}
                onChange={onChangeSelect}
              >
                <option value="negativo">negativo</option>
                <option value="positivo">positivo</option>
              </select>
              <label>Resultado do teste</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <select
                value={statusData.final_classification || ''}
                name="final_classification"
                defaultChecked={statusData.final_classification}
                onChange={onChangeSelect}
              >
                <option value="nao_definido">Não definido</option>
                <option value="confirmacao_laboratorial">
                  Confirmação laboratorial
                </option>
                <option value="confirmacao_clinico_epidemiologico">
                  Confirmação clínico epidemiológico
                </option>
                <option value="descartado">Descartado</option>
              </select>
              <label>Classificação final</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <label htmlFor="fixed_report_symptom_onset_date">
                Data de coleta do material para teste
              </label>
              <Input
                id="fixed_report_symptom_onset_date"
                name="collection_date"
                type="text"
                className="datepicker validate"
              />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <select
                value={statusData.status}
                name="status"
                onChange={onChangeSelect}
              >
                <option value="suspeito">suspeito</option>
                <option value="internado">internado</option>
                <option value="descartado_por_isolamento">
                  descartado por tempo de isolamento
                </option>
                <option value="descartado_por_teste">
                  descartado por teste
                </option>
                <option value="em_tratamento_domiciliar">
                  em tratamento domiciliar
                </option>
                <option value="internado_em_uti">internado em UTI</option>
                <option value="ignorado">ignorado</option>
                <option value="cancelado">cancelado</option>
                <option value="curado">recuperado</option>
                <option value="obito">óbito</option>
              </select>
              <label>Status do Paciente*</label>
            </div>
          </div>
        </Form>
        <div className="row">
          <div className="col s6">
            <button className="modal-close btn blue left">Cancelar</button>
          </div>
          <div className="col s6">
            <button
              onClick={() => {
                formRef.current.submitForm();
              }}
              className="modal-close btn waves-effect waves-green right"
            >
              Atualizar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateTestDataPopUp;
