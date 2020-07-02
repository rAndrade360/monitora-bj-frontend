import React, { useState, useEffect } from 'react';
import { format, parse } from 'date-fns';
import CardInfo from '../../components/CardInfo';
import ptBR from 'date-fns/locale/pt-BR';
import api from '../../services/api';

// import { Container } from './styles';
const nowDate = parse(
  format(Date.now(), 'dd/MM/yyyy'),
  'dd/MM/yyyy',
  new Date()
);

function DailyNewsletter() {
  const [newsletter, setNewsletter] = useState({ data: {}, count: 0 });
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState({ list: [], count: 0 });
  const [addresses, setAddresses] = useState({});
  useEffect(() => {
    async function loads() {
      async function loadNewsletter() {
        const response = await api.get('/patients/newsletter', {
          params: {
            date: nowDate,
            with_address: 'true',
            is_distinct: 'true',
          },
        });
        let data = response.data;
        data.logs = data.logs.filter(
          (value) =>
            value.oldValue !== 'internado' &&
            value.oldValue !== 'obito' &&
            value.oldValue !== 'em_tratamento_domiciliar' &&
            value.oldValue !== 'internado_em_uti'
        );
        data.logs = data.logs.filter(
          (value) =>
            value.newValue === 'internado' ||
            value.newValue === 'obito' ||
            value.newValue === 'em_tratamento_domiciliar' ||
            value.newValue === 'internado_em_uti'
        );
        const addressData = {
          urbana: {},
          rural: {},
        };
        data.logs.forEach((value) => {
          if (value.zone && value.address) {
            addressData[value.zone][value.address] = addressData[value.zone][
              value.address
            ]
              ? addressData[value.zone][value.address] + 1
              : 1;
          }
        });

        setNewsletter({ count: data.logs.length, data });
        setAddresses(addressData);
      }
      async function loadPatients() {
        const response = await api.get('/patients', {
          params: {
            date: nowDate,
          },
        });
        setPatients({
          list: response.data,
          count: response.headers['x-total-count'],
        });
      }
      await loadNewsletter();
      await loadPatients();
      setLoading(false);
    }
    loads();
  }, []);
  if (loading) {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <h1 className="title center">Carregando...</h1>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <h1 className="title center">
            Relatório Diário (
            {format(Date.now(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })})
          </h1>
        </div>
      </div>
      <div className="row card-container">
        <CardInfo
          information={{
            title: 'Cadastrados',
            value: patients.count,
            discription: 'Número de casos em triagem hoje',
            color: '#ffff00ff',
          }}
        />
        <CardInfo
          information={{
            title: 'Confirmados',
            value: newsletter.count,
            discription: 'Número de casos confirmados hoje',
            color: '#ff0000ff',
          }}
        />
      </div>
      <div className="row">
        <div className="col s12 m5 left">
          <table className="responsive-table centered">
            <caption className="text-legend">Zona urbana</caption>
            <thead>
              <tr style={{ backgroundColor: 'blue', color: '#fff' }}>
                <th>Bairro</th>
                <th>Casos</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(addresses.urbana).map((item, key) => (
                <tr key={key}>
                  <td>{item}</td>
                  <td>{addresses.urbana[item]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col s12 m5 right">
          <table className="responsive-table centered">
            <caption className="text-legend">Zona rural</caption>
            <thead>
              <tr style={{ backgroundColor: 'blue', color: '#fff' }}>
                <th>Povoado</th>
                <th>Casos</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(addresses.rural).map((item, key) => (
                <tr key={key}>
                  <td>{item}</td>
                  <td>{addresses.rural[item]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DailyNewsletter;
