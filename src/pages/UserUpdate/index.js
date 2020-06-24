import React, { useEffect, useState } from 'react';
import { Form } from '@unform/web';
import Materialize from 'materialize-css';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { parse, format, parseISO } from 'date-fns';
import Input from '../../components/Input';
import InputMask from '../../components/InputMask';
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
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { id } = useParams();
  const { token } = useAuth();
  useEffect(() => {
    const elemsDatetime = document.querySelectorAll('.datepicker');
    const elemsSelect = document.querySelectorAll('select');
    Materialize.Datepicker.init(elemsDatetime, { i18n, format: 'dd/mm/yyyy' });
    Materialize.FormSelect.init(elemsSelect);
    Materialize.updateTextFields();
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
          cpf: patientData.cpf,
          cns: patientData.cns,
          cbo: patientData.cbo,
          phone_number: patientData.phone_number,
          passport: patientData.passport,
          whatsapp: patientData.whatsapp,
          birthday: format(parseISO(patientData.birthday), 'dd/MM/yyyy'),
        },
        address: {
          address: patientData.address,
          street: patientData.street,
          number: patientData.number,
          complement: patientData.complement,
          cep: patientData.cep,
        },
        fixed_report: {
          temperature: patientData.temperature,
          blood_glucose: patientData.blood_glucose,
          blood_pressure: patientData.blood_pressure,
          heart_rate: patientData.heart_rate,
          oxygen_saturation: patientData.oxygen_saturation,
          household_contacts: patientData.household_contacts,
          additional_notes: patientData.additional_notes,
        },
      });
      setLoading(false);
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
    data.fixed_report.risk = formSelect.risk;
    data.patient.phone_number = formSelect.phone_number || null;
    data.patient.whatsapp = formSelect.whatsapp || null;
    data.fixed_report.status = formSelect.status;
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
    history.goBack();
  }

  if (loading) {
    return <div className="row">Carregando...</div>;
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
                  <InputMask
                    placeholder="Nome"
                    id="patient_monther_name"
                    name="patient.monther_name"
                    type="text"
                    className="validate"
                  />
                </div>
                <div className=" col s12 m6">
                  <label htmlFor="patient_cpf">Cpf do paciente*</label>
                  <Input
                    id="patient_cpf"
                    name="patient.cpf"
                    type="text"
                    className="validate"
                    disabled={
                      initialData.patient.cpf &&
                      initialData.patient.cpf.length > 0
                        ? true
                        : false
                    }
                  />
                  <span
                    class="helper-text"
                    data-error="O cpf deve ter pelo menos 11 números"
                    data-success="Tudo certo!"
                  ></span>
                </div>
                <div className="col s12 m6">
                  <label htmlFor="patient_cbo">Cbo</label>
                  <Input
                    id="patient_cbo"
                    name="patient.cbo"
                    type="text"
                    className="validate"
                  />
                </div>
                <div className="col s12 m6">
                  <label htmlFor="patient_cns">Cns</label>
                  <Input
                    id="patient_cns"
                    name="patient.cns"
                    type="text"
                    className="validate"
                    disabled={
                      initialData.patient.cns &&
                      initialData.patient.cns.length > 0
                        ? true
                        : false
                    }
                  />
                </div>
                <div className="col s12 m6">
                  <label htmlFor="patient_phone">Telefone*</label>
                  <Input
                    id="patient_phone"
                    name="patient.phone_number"
                    type="text"
                    className="validate"
                  />
                </div>
                <div className="col s12 m6">
                  <label htmlFor="whatsapp">Whatsapp*</label>
                  <Input
                    id="whatsapp"
                    name="patient.whatsapp"
                    type="text"
                    className="validate"
                  />
                </div>
                <div className="col s12 m6">
                  <label htmlFor="passport">Passaporte</label>
                  <Input
                    id="passport"
                    name="patient.passport"
                    type="number"
                    className="validate"
                  />
                </div>

                <div className="col s12 m6">
                  <label>Sexo*</label>
                  <select
                    value={formSelect.genre}
                    name="genre"
                    className="browser-default"
                    defaultChecked={formSelect.genre}
                    onChange={handleChangeSelect}
                  >
                    <option value="feminino">feminino</option>
                    <option value="masculino">masculino</option>
                  </select>
                </div>
                <div className="col s12 m6">
                  <label htmlFor="patient_birthday">Data de nascimento*</label>
                  <InputMask
                    id="patient_birthday"
                    name="patient.birthday"
                    mask="99/99/9999"
                    type="text"
                    className="validate"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <legend>Dados de endereço</legend>
            <div className="row">
              <div className="row">
                <div className="col s12 m6">
                  <label htmlFor="address_address">Bairro*</label>
                  <Input
                    placeholder="Centro"
                    id="address_address"
                    name="address.address"
                    type="text"
                    className="validate"
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
                <div className="col s12 m6">
                  <label htmlFor="address_cep">CEP*</label>
                  <Input
                    id="address_cep"
                    name="address.cep"
                    type="number"
                    className="validate"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <legend>Dados de saúde</legend>
            <div className="row">
              <div className="col s12 m6">
                <label>Risco do Paciente*</label>
                <select
                  value={formSelect.risk}
                  className="browser-default"
                  name="risk"
                  onChange={handleChangeSelect}
                >
                  <option value="baixo">baixo</option>
                  <option value="medio">médio</option>
                  <option value="alto">alto</option>
                  <option value="critico">crítico</option>
                </select>
              </div>
              <div className="col s12 m6">
                <label>Status do Paciente*</label>
                <select
                  value={formSelect.status}
                  className="browser-default"
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
              </div>
              <div className=" col s12 m6">
                <label className="active" htmlFor="temperature">
                  Temperatura
                </label>
                <Input
                  id="temperature"
                  name="fixed_report.temperature"
                  type="text"
                  className="validate"
                />
              </div>
              <div className=" col s12 m6">
                <label className="active" htmlFor="blood_glucose">
                  Glicemia
                </label>
                <Input
                  id="blood_glucose"
                  name="fixed_report.blood_glucose"
                  type="text"
                  className="validate"
                />
              </div>
              <div className="col s12 m6">
                <label className="active" htmlFor="blood_pressure">
                  Pressão arterial
                </label>
                <Input
                  id="blood_pressure"
                  name="fixed_report.blood_pressure"
                  type="text"
                  className="validate"
                />
              </div>
              <div className="col s12 m6">
                <label className="active" htmlFor="heart_rate">
                  Frequência cardíaca
                </label>
                <Input
                  id="heart_rate"
                  name="fixed_report.heart_rate"
                  type="text"
                  className="validate"
                />
              </div>
              <div className="col s12 m6">
                <label className="active" htmlFor="oxygen_saturation">
                  Saturação de oxigênio
                </label>
                <Input
                  id="oxygen_saturation"
                  name="fixed_report.oxygen_saturation"
                  type="text"
                  className="validate"
                />
              </div>
              <div className="col s12 m6">
                <label className="active" htmlFor="household_contacts">
                  Contatos intradomiciliares
                </label>
                <Input
                  id="household_contacts"
                  name="fixed_report.household_contacts"
                  type="number"
                  className="validate"
                />
              </div>
              <div className="col s12 m6">
                <label className="active" htmlFor="additional_notes">
                  Observações
                </label>
                <Input
                  id="additional_notes"
                  name="fixed_report.additional_notes"
                  type="text"
                  className="materialize-textarea validate"
                />
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
