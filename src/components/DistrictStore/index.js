import React, { useState } from 'react';

// import { Container } from './styles';

function DistrictStore({ onDistrictStoreClick }) {
  const [form, setForm] = useState({ name: '', zone: '' });
  function onChangeDistrict(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  return (
    <div className="modal" id="modalDistrict">
      <div className="container">
        <div className="modal-content">
          <div className="col s12">
            <h1 className="title">Cadastrar bairro ou provoado</h1>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <label>Nome do bairro ou povoado*</label>
            <input
              type="text"
              className="validate"
              name="name"
              onChange={onChangeDistrict}
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <select
              name="zone"
              defaultChecked={form.zone}
              onChange={onChangeDistrict}
            >
              <option value="" disabled>
                Selecionar
              </option>
              <option value="urbana">urbana</option>
              <option value="rural">rural</option>
            </select>
            <label>Zona</label>
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <button type="button" className="modal-close btn blue left">
              Cancelar
            </button>
          </div>
          <div className="col s6">
            <button
              type="button"
              onClick={() => onDistrictStoreClick(form.name, form.zone)}
              className="modal-close btn waves-effect waves-green right"
            >
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DistrictStore;
