import React, { useEffect, useState } from 'react';
import { Form } from '@unform/web';
import Materialize from 'materialize-css';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { parse, format } from 'date-fns';
import Input from '../../components/Input';
import api from '../../services/api';
import { useAuth } from '../../contexts/Auth';
import i18n from '../../utils/i18n';

function UserUpdate() {
  const [formSelect, setFormSelect] = useState({
    genre: '',
    risk: '',
    status: '',
  });
  const [initialData, setInitialData] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const { token } = useAuth();
  useEffect(() => {
    const elemsDatetime = document.querySelectorAll('.datepicker');
    const elemsSelect = document.querySelectorAll('select');
    Materialize.Datepicker.init(elemsDatetime, { i18n, format: 'dd/mm/yyyy' });
    Materialize.FormSelect.init(elemsSelect);
  }, []);
  useEffect(() => {
    const source = axios.CancelToken.source();
    async function loadPatientData() {
      let response;
      try {
        response = await api.get(`/patient/${id}/show`, {
          cancelToken: source.token,
        });
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        } else {
          return;
        }
      }
      const patientData = response.data;
      setFormSelect({
        genre: patientData.genre,
        risk: patientData.risk,
        status: patientData.status,
      });
      setInitialData({
        patient: {
          name: patientData.name,
          monther_name: patientData.monther_name,
          phone_number: patientData.phone_number,
          birthday: format(patientData.birthday, 'dd/MM/yyyy'),
        },
        address: {
          address: patientData.address,
          street: patientData.street,
          number: patientData.number,
          complement: patientData.complement,
        },
      });
    }

    loadPatientData();
    return () => {
      source.cancel();
    };
  }, [id]);

  function handleChangeSelect(e) {
    setFormSelect({ ...formSelect, [e.target.name]: e.target.value });
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
    try {
      await api.put(`/patient/${id}/update`, data, {
        headers: {
          authorization: token,
        },
      });
    } catch (err) {
      alert(
        'Não foi possível alterar os dados do paciente! Tente novamente mais tarde.'
      );
      return;
    }
    alert('Dados alterados com sucesso!');
    history.push(`/dashboard/patient/show/${id}`);
  }

  return (
    <div className="row container">
      <div className="row">
        <div className="col s12">
          <h1 className="title center">Alterar dados</h1>
        </div>
      </div>
      <div className="row">
        <Form
          onSubmit={handleSubmit}
          initialData={initialData}
          className="col s12"
        >
          <div className="row">
            <legend>Dados pessoais</legend>
            <div className="row">
              <div className="row">
                <div className="col s12 m6">
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
                <div className="col s12 m6">
                  <label htmlFor="patient_monther_name">Nome da mãe*</label>
                  <Input
                    placeholder="Nome"
                    id="patient_monther_name"
                    name="patient.monther_name"
                    type="text"
                    className="validate"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col s12 m6">
                  <label htmlFor="patient_phone">Telefone*</label>
                  <Input
                    placeholder="(00)00000-0000"
                    id="patient_phone"
                    name="patient.phone_number"
                    type="text"
                    className="validate"
                    required
                  />
                </div>

                <div className="input-field col s12 m6">
                  <select
                    value={formSelect.genre}
                    name="genre"
                    defaultChecked={formSelect.genre}
                    onChange={handleChangeSelect}
                  >
                    <option value="feminino">feminino</option>
                    <option value="masculino">masculino</option>
                  </select>
                  <label>Sexo*</label>
                </div>
              </div>
              <div className="row">
                <div className="col s12 m6">
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
              </div>
            </div>
          </div>
          <div className="row">
            <legend>Dados de endereço</legend>
            <div className="row">
              <div className="col s12 m6">
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
              <div className="col s12 m6">
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
              <div className="col s12 m6">
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
              <div className="col s12 m6">
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
            <legend>Dados de saúde</legend>
            <div className="row">
              <div className="input-field col s12 m6">
                <select
                  value={formSelect.risk}
                  name="risk"
                  onChange={handleChangeSelect}
                >
                  <option value="baixo">baixo</option>
                  <option value="medio">médio</option>
                  <option value="alto">alto</option>
                  <option value="critico">crítico</option>
                </select>
                <label>Risco do Paciente*</label>
              </div>
              <div className="input-field col s12 m6">
                <select
                  value={formSelect.status}
                  name="status"
                  onChange={handleChangeSelect}
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
          </div>
          <div className="row">
            <div className="col s12">
              <button type="submit" className="btn green right">
                Atualizar cadastro <i className="material-icons right">send</i>{' '}
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default UserUpdate;
