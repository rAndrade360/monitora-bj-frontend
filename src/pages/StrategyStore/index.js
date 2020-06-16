import React, { useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';
import Input from '../../components/Input';
import materialize from 'materialize-css';
import api from '../../services/api';

function StrategyStore() {
  const [type, setType] = useState('basic_unity');
  const history = useHistory();
  useEffect(() => {
    const elemSelect = document.querySelectorAll('select');
    materialize.FormSelect.init(elemSelect);
  }, []);
  async function handleSubmit(data) {
    data.strategy.permission = type;
    try {
      await api.post('/strategies', data);
    } catch (error) {
      if (error.response.status === 401) {
        alert('Você não tem autorização para realizar esse tipo de ação!');
      }
      return;
    }
    alert('Estratégia cadastrada com sucesso!');
    history.push('/dashboard/strategies');
    return;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <h1 className="title center">Cadastrar Estratégia</h1>
        </div>
        <div className="row">
          <Form className="col s12" onSubmit={handleSubmit}>
            <div className="row">
              <div className="input-field col s12 m6">
                <label htmlFor="name">Nome da estratégia*</label>
                <Input
                  id="name"
                  name="strategy.name"
                  type="text"
                  className="validate"
                  required
                />
              </div>
              <div className="input-field col s12 m6">
                <label htmlFor="access_id">Id de acesso:*</label>
                <Input
                  id="access_id"
                  name="strategy.access_id"
                  type="text"
                  className="validate"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12 m6">
                <select value={type} name="risk" onChange={setType}>
                  <option value="basic_unity">Unidade Básica de Saúde</option>
                  <option value="test_center">Centro de testagem</option>
                </select>
                <label>Tipo:*</label>
              </div>
              <div className="input-field col s12 m6">
                <Input
                  id="password"
                  name="strategy.password"
                  type="password"
                  className="validate"
                  required
                />
                <label htmlFor="password">Senha da estratégia:*</label>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <button className="btn blue waves-effect right">
                  Cadastrar
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default StrategyStore;
