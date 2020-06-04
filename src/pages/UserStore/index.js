import React, { useEffect, useState } from 'react';
import { Form } from '@unform/web';
import Materialize from 'materialize-css';
import { useHistory } from 'react-router-dom';
import { parse } from 'date-fns';
import Input from '../../components/Input';
import api from '../../services/api';
import i18n from '../../utils/i18n';

// import { Container } from './styles';

function UserStore() {
  const [formSelect, setFormSelect] = useState({
    genre: 'male',
    risk: 'low',
    status: 'suspect',
  });
  const history = useHistory();
  useEffect(() => {
    const elemsDatetime = document.querySelectorAll('.datepicker');
    const elemsSelect = document.querySelectorAll('select');
    Materialize.Datepicker.init(elemsDatetime, { i18n, format: 'dd/mm/yyyy' });
    Materialize.FormSelect.init(elemsSelect);
  }, []);

  function handleChangeSelect(e) {
    setFormSelect({
      ...formSelect,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(data) {
    data.patient.genre = formSelect.genre;
    data.patient.risk = formSelect.risk;
    data.patient.status = formSelect.status;
    data.patient.birthday = parse(
      data.patient.birthday,
      'dd/MM/yyyy',
      new Date()
    );
    data.patient.screening_day = parse(
      data.patient.screening_day,
      'dd/MM/yyyy',
      new Date()
    );
    data.fixed_report.recent_travel = data.fixed_report.recent_travel
      ? true
      : false;
    data.fixed_report.recent_contact = data.fixed_report.recent_contact
      ? true
      : false;
    try {
      await api.post('/patients', data);
    } catch (err) {
      alert(
        'Não foi possível cadastrar o novo paciente! Tente novamente mais tarde.'
      );
      history.push('/dashboard/patients/1');
    }
    alert('Paciente cadastrado com sucesso!');
    history.push('/dashboard/patients/1');
  }

  return (
    <div>
      <div className="row container">
        <div className="row">
          <div className="col s12">
            <h1 className="title center">Cadastrar novo paciente</h1>
          </div>
        </div>
        <div className="row">
          <Form onSubmit={handleSubmit} className="col s12">
            <div className="row">
              <legend>Dados pessoais</legend>
              <div className="row">
                <div className="input-field col s12 m6">
                  <label htmlFor="patient_name">Nome do paciente*</label>
                  <Input
                    placeholder="Nome"
                    id="patient_name"
                    name="patient.name"
                    type="text"
                    className="validate"
                    required
                  />
                </div>
                <div className="input-field col s12 m6">
                  <label htmlFor="patient_cpf">Cpf do paciente*</label>
                  <Input
                    placeholder="000.000.000-00"
                    id="patient_cpf"
                    name="patient.cpf"
                    type="text"
                    className="validate"
                    required
                  />
                </div>
                <div className="input-field col s12 m6">
                  <label htmlFor="patient_phone">Telefone*</label>
                  <Input
                    placeholder="(00)00000-0000"
                    id="patient_phone"
                    name="patient.phone_number"
                    type="number"
                    className="validate"
                    required
                  />
                </div>
                <div className="input-field col s12 m6">
                  <select
                    value={formSelect.genre}
                    name="genre"
                    onChange={handleChangeSelect}
                  >
                    <option value="male">masculino</option>
                    <option value="female">feminino</option>
                  </select>
                  <label>Sexo*</label>
                </div>
                <div className="input-field col s12 m6">
                  <label htmlFor="patient_birthday">Data de nascimento*</label>
                  <Input
                    placeholder="01/01/2000"
                    id="patient_birthday"
                    name="patient.birthday"
                    type="text"
                    className="datepicker validate"
                    required
                  />
                </div>
                <div className="input-field col s12 m6">
                  <label htmlFor="patient_screening_day">
                    Data da triagem*
                  </label>
                  <Input
                    placeholder="01/01/2020"
                    id="patient_screening_day"
                    name="patient.screening_day"
                    type="text"
                    className="datepicker validate"
                    required
                  />
                </div>
                <div className="input-field col s12 m6">
                  <select
                    value={formSelect.risk}
                    name="risk"
                    onChange={handleChangeSelect}
                  >
                    <option value="low">baixo</option>
                    <option value="medium">médio</option>
                    <option value="high">alto</option>
                    <option value="critic">crítico</option>
                  </select>
                  <label>Risco do Paciente*</label>
                </div>
                <div className="input-field col s12 m6">
                  <select
                    value={formSelect.status}
                    name="status"
                    onChange={handleChangeSelect}
                  >
                    <option value="suspect">suspeito</option>
                    <option value="monitored">monitorado</option>
                    <option value="infected">infectado</option>
                    <option value="discarded_by_isolation">
                      descartado por tempo de isolamento
                    </option>
                    <option value="discarded_by_test">
                      descartado por teste
                    </option>
                    <option value="cured">recuperado</option>
                    <option value="death">óbito</option>
                  </select>
                  <label>Status do Paciente*</label>
                </div>
                <div className="input-field col s12 m6">
                  <label htmlFor="patient_password">Nova senha*</label>
                  <Input
                    placeholder="senha 123"
                    id="patient_password"
                    name="patient.password"
                    type="password"
                    className="validate"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <legend>Dados de endereço</legend>
              <div className="row">
                <div className="input-field col s12 m6">
                  <label htmlFor="address_address">Bairro*</label>
                  <Input
                    placeholder="Centro"
                    id="address_address"
                    name="address.address"
                    type="text"
                    className="validate"
                    required
                  />
                </div>
                <div className="input-field col s12 m6">
                  <label htmlFor="address_street">Logradouro*</label>
                  <Input
                    placeholder="Avenida José Pedro"
                    id="address_street"
                    name="address.street"
                    type="text"
                    className="validate"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12 m6">
                  <label htmlFor="address_number">Número*</label>
                  <Input
                    placeholder="12"
                    id="address_number"
                    name="address.number"
                    type="number"
                    className="validate"
                    required
                  />
                </div>
                <div className="input-field col s12 m6">
                  <label htmlFor="address_complement">Complemento</label>
                  <Input
                    placeholder="Insira um complemento..."
                    id="address_complement"
                    name="address.complement"
                    type="text"
                    className="validate"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <legend>Dados da triagem</legend>
              <div className="row">
                <div className="col s12 m6">
                  <p className="title">O paciente viajou recentemente?</p>
                  <div className="row">
                    <div className="switch col s12 m6">
                      <label>
                        Não
                        <Input
                          type="checkbox"
                          name="fixed_report.recent_travel"
                          value={true}
                        />
                        <span className="lever"></span>
                        Sim
                      </label>
                    </div>
                  </div>
                </div>
                <div className="input-field col s12 m6">
                  <label htmlFor="traveled_to_city">Para onde?</label>
                  <Input
                    placeholder="Paris, França"
                    id="traveled_to_city"
                    name="fixed_report.traveled_to_city"
                    type="text"
                    className="validate"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col s12 m6">
                  <label className="title">
                    O paciente teve contato recente com algum caso suspeito?
                  </label>
                  <div className="row">
                    <div className="switch col s12 m6">
                      <label>
                        Não
                        <Input
                          type="checkbox"
                          name="fixed_report.recent_contact"
                          value={true}
                        />
                        <span className="lever"></span>
                        Sim
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <button type="submit" className="btn waves blue right">
                  Cadastrar <i className="material-icons right">send</i>
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default UserStore;
