import React, { useEffect, useState, useRef } from 'react';
import { Form } from '@unform/web';
import Materialize from 'materialize-css';
import { useHistory } from 'react-router-dom';
import { parse } from 'date-fns';
import Input from '../../components/Input';
import InputMask from '../../components/InputMask';
import api from '../../services/api';
import DailyReportPopUp from '../../components/DailyReportPopUp';
import fetchStrategies from '../../utils/fetchStrategies';
import { normalizeCpf } from '../../utils/formate';
import { useAuth } from '../../contexts/Auth';

// import { Container } from './styles';

function UserStore() {
  const [formSelect, setFormSelect] = useState({
    genre: 'masculino',
    risk: 'baixo',
    status: 'suspeito',
    test_type: 'teste_rapido_anticorpo',
    test_status: 'solicitado',
  });
  const [strategies, setStrategies] = useState({
    strategies: [],
    selected: null,
  });
  const [checkbox, setCheckbox] = useState({
    is_foreign: false,
    healthcare_professional: false,
    condicao: [],
    recent_contact: false,
    recent_travel: false,
  });
  const [dailyReportChecked, setDailyReportChecked] = useState({});
  const { user } = useAuth();
  const formRef = useRef(null);
  const history = useHistory();
  useEffect(() => {
    const elemsSelect = document.querySelectorAll('select');
    Materialize.FormSelect.init(elemsSelect);
  }, []);

  useEffect(() => {
    async function loadStrategies() {
      if (user.permission === 'secretary') {
        const response = await fetchStrategies(history);
        const newData = response.data.filter(
          (res) => res.permission === 'basic_unity'
        );
        setStrategies({
          strategies: response.status === 200 ? newData : [],
          selected: response.status === 200 ? newData[0].id : 0,
        });
      }
    }
    loadStrategies();
  }, [history, user.permission]);

  function handleChangeStrategy(e) {
    setStrategies({
      ...strategies,
      selected: e.target.value,
    });
  }

  function handleChangeSelect(e) {
    setFormSelect({
      ...formSelect,
      [e.target.name]: e.target.value,
    });
  }

  function handleChangeCheckbox(e) {
    if (e.target.name === 'condicao') {
      const checkCondicao = checkbox.condicao;
      checkCondicao.includes(e.target.value)
        ? checkCondicao.slice(checkCondicao.indexOf(e.target.value), 1)
        : checkCondicao.push(e.target.value);
      setCheckbox({ ...checkbox, condicao: checkCondicao });
    } else {
      setCheckbox({
        ...checkbox,
        [e.target.name]: !e.target.checked,
      });
    }
  }

  async function handleSubmit(data) {
    let sendData = {
      ...data,
      test_data: {
        test_status: formSelect.test_status,
        test_type: formSelect.test_type,
      },
    };
    sendData.patient.genre = formSelect.genre;
    sendData.patient.monther_name = sendData.patient.monther_name || null;
    sendData.patient.phone_number = normalizeCpf(data.patient.phone_number);
    sendData.patient.phone_number = sendData.patient.phone_number
      ? `+55${sendData.patient.phone_number}`
      : null;
    sendData.patient.cpf =
      sendData.patient.cpf && sendData.patient.cpf.length > 0
        ? normalizeCpf(data.patient.cpf)
        : null;
    sendData.patient.whatsapp =
      sendData.patient.whatsapp || sendData.patient.phone_number;
    sendData.fixed_report.risk = formSelect.risk;
    sendData.fixed_report.status = formSelect.status;
    sendData.conditions = checkbox.condicao;
    sendData.patient.healthcare_professional = checkbox.healthcare_professional;
    sendData.patient.is_foreign = checkbox.is_foreign;
    sendData.patient.birthday = parse(
      sendData.patient.birthday,
      'dd/MM/yyyy',
      new Date()
    );
    sendData.fixed_report.symptom_onset_date = parse(
      sendData.fixed_report.symptom_onset_date,
      'dd/MM/yyyy',
      new Date()
    );
    sendData.fixed_report.screening_day = parse(
      sendData.fixed_report.screening_day,
      'dd/MM/yyyy',
      new Date()
    );
    sendData.fixed_report.recent_travel = checkbox.recent_travel;
    sendData.fixed_report.recent_contact = checkbox.recent_contact;
    sendData.daily_report = dailyReportChecked;
    try {
      await api.post('/patients', sendData, {
        headers: {
          strategy_id:
            strategies.selected || api.defaults.headers.common.strategy_id,
        },
      });
    } catch (err) {
      if (err.response.status === 400)
        return err.response.data.errors.map((erro) => alert(erro.msg));
      return;
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
        {strategies.strategies.length > 0 ? (
          <div className="row">
            <div className="col s12 m6">
              <label>Selecione a UBS*</label>
              <select
                value={strategies.selected}
                name="genre"
                className="browser-default"
                onChange={handleChangeStrategy}
              >
                {strategies.strategies.map((strategy) => (
                  <option key={strategy.id} value={strategy.id}>
                    {strategy.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : null}
        <div className="row">
          <Form ref={formRef} onSubmit={handleSubmit} className="col s12">
            <div className="row">
              <legend>Dados pessoais</legend>
              <div className="row">
                <div className="input-field col s12 m6">
                  <label htmlFor="patient_name">Nome do paciente*</label>
                  <Input
                    id="patient_name"
                    name="patient.name"
                    type="text"
                    className="validate"
                    minLength={5}
                    required
                  />
                  <span
                    class="helper-text"
                    data-error="O nome deve ter pelo menos 5 caracteres"
                    data-success="Tudo certo!"
                  ></span>
                </div>
                <div className="input-field col s12 m6">
                  <label htmlFor="patient_monther_name">Nome da mãe*</label>
                  <Input
                    id="patient_monther_name"
                    name="patient.monther_name"
                    minLength={5}
                    type="text"
                    className="validate"
                  />
                  <span
                    class="helper-text"
                    data-error="O nome da mãe deve ter pelo menos 5 caracteres"
                    data-success="Tudo certo!"
                  ></span>
                </div>
                <div className="input-field col s12 m6">
                  <label htmlFor="patient_cpf">Cpf do paciente*</label>
                  <InputMask
                    id="patient_cpf"
                    name="patient.cpf"
                    type="text"
                    mask="999.999.999-99"
                    className="validate"
                  />
                  <span
                    class="helper-text"
                    data-error="O cpf deve ter pelo menos 11 números"
                    data-success="Tudo certo!"
                  ></span>
                </div>
                <div className="input-field col s12 m6">
                  <label htmlFor="patient_cbo">Cbo</label>
                  <Input
                    id="patient_cbo"
                    name="patient.cbo"
                    type="text"
                    className="validate"
                  />
                </div>
                <div className="input-field col s12 m6">
                  <label htmlFor="patient_cns">Cns</label>
                  <InputMask
                    id="patient_cns"
                    name="patient.cns"
                    type="text"
                    mask="999 9999 9999 9999"
                    className="validate"
                  />
                </div>
                <div className="input-field col s12 m6">
                  <label htmlFor="patient_phone">Telefone*</label>
                  <InputMask
                    id="patient_phone"
                    name="patient.phone_number"
                    type="text"
                    className="validate"
                    mask="(99)99999-9999"
                  />
                </div>
                <div className="input-field col s12 m6">
                  <label htmlFor="whatsapp">WhatsApp</label>
                  <InputMask
                    id="whatsapp"
                    name="patient.whatsapp"
                    mask="(99)99999-9999"
                    type="text"
                    className="validate"
                  />
                </div>
                <div className="input-field col s12 m6">
                  <label htmlFor="passport">Passaporte</label>
                  <Input
                    id="passport"
                    name="patient.passport"
                    type="number"
                    className="validate"
                  />
                </div>
                <div className="input-field col s12 m6">
                  <select
                    value={formSelect.genre}
                    name="genre"
                    onChange={handleChangeSelect}
                  >
                    <option value="masculino">masculino</option>
                    <option value="feminino">feminino</option>
                  </select>
                  <label>Sexo*</label>
                </div>
                <div className="input-field col s12 m6">
                  <label htmlFor="patient_birthday">Data de nascimento*</label>
                  <InputMask
                    id="patient_birthday"
                    name="patient.birthday"
                    type="text"
                    mask="99/99/9999"
                    className="validate"
                    required
                  />
                  <span
                    class="helper-text"
                    data-error="Informe a data de nascimento"
                    data-success="Tudo certo!"
                  ></span>
                </div>
                <div className="input-field col s12 m6">
                  <label htmlFor="patient_origin_country">País de origem</label>
                  <Input
                    id="patient_origin_country"
                    name="patient.origin_country"
                    type="text"
                    className="validate"
                  />
                </div>
                <div className="col s12 m6">
                  <p className="title">O paciente é profissional de saúde?</p>
                  <div className="row">
                    <div className="switch col s12 m6">
                      <label>
                        Não
                        <input
                          type="checkbox"
                          name="healthcare_professional"
                          onChange={handleChangeCheckbox}
                        />
                        <span className="lever"></span>
                        Sim
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col s12 m6">
                  <p className="title">O paciente é estrangeiro?</p>
                  <div className="row">
                    <div className="switch col s12 m6">
                      <label>
                        Não
                        <input
                          type="checkbox"
                          name="is_foreign"
                          value={true}
                          onChange={handleChangeCheckbox}
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
              <legend>Dados de endereço</legend>
              <div className="row">
                <div className="input-field col s12 m6">
                  <label htmlFor="address_address">Bairro*</label>
                  <Input
                    id="address_address"
                    name="address.address"
                    type="text"
                    className="validate"
                  />
                </div>
                <div className="input-field col s12 m6">
                  <label htmlFor="address_street">Logradouro*</label>
                  <Input
                    id="address_street"
                    name="address.street"
                    type="text"
                    className="validate"
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12 m6">
                  <label htmlFor="address_number">Número*</label>
                  <Input
                    id="address_number"
                    name="address.number"
                    type="text"
                    className="validate"
                  />
                </div>
                <div className="input-field col s12 m6">
                  <label htmlFor="address_complement">Complemento</label>
                  <Input
                    id="address_complement"
                    name="address.complement"
                    type="text"
                    className="validate"
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12 m6">
                  <label htmlFor="address_cep">CEP*</label>
                  <Input
                    id="address_cep"
                    name="address.cep"
                    type="number"
                    className="validate"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <legend>Dados da triagem</legend>
              <div className="row">
                <div className="input-field col s12 m6">
                  <label htmlFor="fixed_report_screening_day">
                    Data da triagem*
                  </label>
                  <InputMask
                    id="fixed_report_screening_day"
                    name="fixed_report.screening_day"
                    type="text"
                    className="validate"
                    mask="99/99/9999"
                    required
                  />
                </div>
                <div className="input-field col s12 m6">
                  <label htmlFor="fixed_report_symptom_onset_date">
                    Data em que começaram os sintomas*
                  </label>
                  <InputMask
                    id="fixed_report_symptom_onset_date"
                    name="fixed_report.symptom_onset_date"
                    type="text"
                    className="validate"
                    mask="99/99/9999"
                    required
                  />
                </div>
                <div className="row">
                  <div className="col s12 m6">
                    <div className="input-field required">
                      <p>Sintomas do paciente</p>
                      <button
                        type="button"
                        data-target="modal2"
                        className="modal-trigger btn"
                      >
                        Clique para marcar os sintomas
                      </button>
                      <DailyReportPopUp
                        checked={dailyReportChecked}
                        setChecked={setDailyReportChecked}
                      />
                    </div>
                  </div>
                </div>
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
                <div className="input-field col s12 m6">
                  <p className="title">Condições</p>
                  <div className="col s12">
                    <p className="">
                      Doenças respiratórias crônicas descompensadas
                    </p>
                    <div className="row">
                      <div className="switch col s12 m6">
                        <label>
                          Não
                          <input
                            type="checkbox"
                            name="condicao"
                            value={1}
                            onChange={handleChangeCheckbox}
                          />
                          <span className="lever"></span>
                          Sim
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col s12">
                    <p className="">Doenças cardíacas crônicas</p>
                    <div className="row">
                      <div className="switch col s12 m6">
                        <label>
                          Não
                          <input
                            type="checkbox"
                            name="condicao"
                            onChange={handleChangeCheckbox}
                            value={2}
                          />
                          <span className="lever"></span>
                          Sim
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col s12">
                    <p className="">Diabetes</p>
                    <div className="row">
                      <div className="switch col s12 m6">
                        <label>
                          Não
                          <input
                            type="checkbox"
                            name="condicao"
                            onChange={handleChangeCheckbox}
                            value={3}
                          />
                          <span className="lever"></span>
                          Sim
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col s12">
                    <p className="">
                      Doenças renais crônicas em estado avançado (graus 3, 4 e
                      5)
                    </p>
                    <div className="row">
                      <div className="switch col s12 m6">
                        <label>
                          Não
                          <input
                            type="checkbox"
                            name="condicao"
                            onChange={handleChangeCheckbox}
                            value={4}
                          />
                          <span className="lever"></span>
                          Sim
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col s12">
                    <p className="">Imunosupressão</p>
                    <div className="row">
                      <div className="switch col s12 m6">
                        <label>
                          Não
                          <input
                            onChange={handleChangeCheckbox}
                            type="checkbox"
                            name="condicao"
                            value={5}
                          />
                          <span className="lever"></span>
                          Sim
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col s12">
                    <p className="">Gestante de alto risco</p>
                    <div className="row">
                      <div className="switch col s12 m6">
                        <label>
                          Não
                          <input
                            type="checkbox"
                            name="condicao"
                            onChange={handleChangeCheckbox}
                            value={6}
                          />
                          <span className="lever"></span>
                          Sim
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col s12">
                    <p className="">
                      Portador de doenças cromossômicas ou estado de fragilidade
                      imunológica
                    </p>
                    <div className="row">
                      <div className="switch col s12 m6">
                        <label>
                          Não
                          <input
                            type="checkbox"
                            name="condicao"
                            onChange={handleChangeCheckbox}
                            value={7}
                          />
                          <span className="lever"></span>
                          Sim
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col s12 m6">
                  <p className="title">O paciente viajou recentemente?</p>
                  <div className="row">
                    <div className="switch col s12 m6">
                      <label>
                        Não
                        <input
                          type="checkbox"
                          name="recent_travel"
                          value={true}
                          onChange={handleChangeCheckbox}
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
                    id="traveled_to_city"
                    name="fixed_report.traveled_to_city"
                    type="text"
                    className="validate"
                  />
                </div>
                <div className="input-field col s12 m6">
                  <label htmlFor="temperature">Temperatura (em °C)</label>
                  <Input
                    id="temperature"
                    name="fixed_report.temperature"
                    type="number"
                    className="validate"
                  />
                </div>
                <div className="input-field col s12 m6">
                  <label htmlFor="blood_glucose">Glicemia (em mg/dL)</label>
                  <Input
                    id="blood_glucose"
                    name="fixed_report.blood_glucose"
                    type="number"
                    className="validate"
                  />
                </div>
                <div className="input-field col s12 m6">
                  <label htmlFor="blood_pressure">
                    Pressão arterial (em mmHg)
                  </label>
                  <Input
                    id="blood_pressure"
                    name="fixed_report.blood_pressure"
                    type="text"
                    className="validate"
                  />
                </div>
                <div className="input-field col s12 m6">
                  <label htmlFor="heart_rate">
                    Frequência cardíaca (em bpm)
                  </label>
                  <Input
                    id="heart_rate"
                    name="fixed_report.heart_rate"
                    type="number"
                    className="validate"
                  />
                </div>
                <div className="input-field col s12 m6">
                  <label htmlFor="oxygen_saturation">
                    Saturação de oxigênio (em %)
                  </label>
                  <Input
                    id="oxygen_saturation"
                    name="fixed_report.oxygen_saturation"
                    type="number"
                    className="validate"
                  />
                </div>
                <div className="input-field col s12 m6">
                  <label htmlFor="household_contacts">
                    Contatos intradomiciliares
                  </label>
                  <Input
                    id="household_contacts"
                    name="fixed_report.household_contacts"
                    type="number"
                    className="validate"
                  />
                </div>
                <div className="input-field col s12 m6">
                  <label htmlFor="additional_notes">Observações</label>
                  <Input
                    id="additional_notes"
                    name="fixed_report.additional_notes"
                    type="text"
                    className="materialize-textarea"
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
                        <input
                          type="checkbox"
                          name="recent_contact"
                          value="true"
                          onChange={handleChangeCheckbox}
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
              <legend>Dados de teste</legend>
              <div className="row">
                <div className="col s12 m6">
                  <div className="input-field col s12 m6">
                    <select
                      value={formSelect.test_status}
                      name="test_status"
                      onChange={handleChangeSelect}
                    >
                      <option value="solicitado">solicitado</option>
                      <option value="coletado">coletado</option>
                      <option value="concluido">concluído</option>
                    </select>
                    <label>Status do Teste*</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col s12 m6">
                  <div className="input-field col s12 m6">
                    <select
                      value={formSelect.test_type}
                      name="test_type"
                      onChange={handleChangeSelect}
                    >
                      <option value="teste_rapido_anticorpo">
                        teste rápido - anticorpo
                      </option>
                      <option value="teste_rapido_antigeno">
                        teste rápido - antígeno
                      </option>
                      <option value="rt_pcr">RT - PCR</option>
                    </select>
                    <label>Tipo de Teste*</label>
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
