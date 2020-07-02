import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import './styles.css';
import { useAuth } from '../../contexts/Auth';
import CardInfo from '../../components/CardInfo';
import api from '../../services/api';

function Home() {
  const [cardData, setCardData] = useState({ info: [], testInfo: [] });
  const [genreData, setGenreData] = useState({});
  const [addresses, setAddresses] = useState({});
  const [statusData, setStatusData] = useState({});
  const [hasData, setHasData] = useState(false);
  const { token, user } = useAuth();

  useEffect(() => {
    async function loadDashboardData() {
      const headers =
        user.permisson === 'secretary'
          ? {
              authorization: token,
            }
          : {
              authorization: token,
              strategy_id: user.id,
            };
      const response = await api.get('/patients/dashboard', {
        headers,
      });
      const dashboardData = response.data;
      const testInfo = [
        {
          title: 'Testes solicitados',
          value: dashboardData.test_status.solicitado,
          discription: 'Número de testes solicitados',
          color: '#05FF1E',
        },
        {
          title: 'Testes coletados',
          value: dashboardData.test_status.coletado,
          discription: 'Número de testes coletados',
          color: '#FFF505',
        },
        {
          title: 'Testes concluídos',
          value: dashboardData.test_status.concluido,
          discription: 'Número de testes concluídos',
          color: '#FF9B05',
        },
        {
          title: 'Testes urgentes',
          value: dashboardData.need_test,
          discription: 'Número de pessoas precisando de teste',
          color: '#FF0505',
        },
      ];
      const info = [
        {
          title: 'Baixo risco',
          value: dashboardData.risks.baixo,
          discription: 'Número de casos de risco baixo',
          color: '#05FF1E',
        },
        {
          title: 'Médio risco',
          value: dashboardData.risks.medio,
          discription: 'Número de casos de risco médio',
          color: '#FFF505',
        },
        {
          title: 'Alto risco',
          value: dashboardData.risks.alto,
          discription: 'Número de casos de risco alto',
          color: '#FF9B05',
        },
        {
          title: 'Crítico risco',
          value: dashboardData.risks.critico,
          discription: 'Número de casos de risco crítico',
          color: '#FF0505',
        },
      ];
      const genreInfo =
        user.permission === 'test_center'
          ? {
              labels: ['positivo', 'negativo'],
              datasets: [
                {
                  data: [
                    dashboardData.test_result.positivo,
                    dashboardData.test_result.negativo,
                  ],
                  backgroundColor: [
                    'rgba(90,178,255,0.8)',
                    'rgba(250,67,67,0.8)',
                  ],
                },
              ],
            }
          : {
              labels: ['masculino', 'feminino'],
              datasets: [
                {
                  data: [
                    dashboardData.genre.masculino,
                    dashboardData.genre.feminino,
                  ],
                  backgroundColor: [
                    'rgba(90,178,255,0.6)',
                    'rgba(250,55,197,0.6)',
                  ],
                },
              ],
            };
      const statusInfo =
        user.permission === 'test_center'
          ? {
              labels: [
                'Não definido',
                'Confirmação Laboratorial',
                'Confirmação clínico epidemiológico',
                'descartado',
              ],
              datasets: [
                {
                  label: 'Situação geral',
                  data: [
                    dashboardData.final_classification.nao_definido,
                    dashboardData.final_classification.confirmacao_laboratorial,
                    dashboardData.final_classification
                      .confirmacao_clinico_epidemiologico,
                    dashboardData.final_classification.descartado,
                  ],
                  backgroundColor: ['#FFF505', '#FF9B05', '#7159c1', '#00aeff'],
                },
              ],
            }
          : {
              labels: [
                'suspeito',
                'internado',
                'descartado por isolamento',
                'descartado por teste',
                'curado',
                'óbito',
                'em tratamento domiciliar',
                'internado em UTI',
                'ignorado',
                'cancelado',
              ],
              datasets: [
                {
                  label: 'Situação geral',
                  data: [
                    dashboardData.status.suspeito,
                    dashboardData.status.internado,
                    dashboardData.status.descartado_por_isolamento,
                    dashboardData.status.descartado_por_teste,
                    dashboardData.status.curado,
                    dashboardData.status.obito,
                    dashboardData.status.em_tratamento_domiciliar,
                    dashboardData.status.internado_em_uti,
                    dashboardData.status.ignorado,
                    dashboardData.status.cancelado,
                  ],
                  backgroundColor: [
                    '#FFF505',
                    '#FF9B05',
                    '#7159c1',
                    '#00aeff',
                    '#05FF1E',
                    '#333333',
                    '#ee75a5',
                    '#FF0505',
                    '#bebebe',
                    '#e2f06f',
                  ],
                },
              ],
            };
      setCardData({ info, testInfo });
      setGenreData(genreInfo);
      setStatusData(statusInfo);
      setAddresses(dashboardData.address);
      setHasData(true);
    }
    loadDashboardData();
  }, [token, user, user.id, user.permission]);

  if (!hasData) {
    return (
      <div className="container center">
        <h1 className="title">Não há dados ainda...</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="row">
        <div className="col s12">
          <h1 className="center title">Relatório Geral</h1>
        </div>
      </div>
      <div className="row container">
        <p>Dados de teste</p>
      </div>
      <div className="card-container row">
        {cardData.info.map((card, index) => (
          <CardInfo key={index} information={card} />
        ))}
      </div>
      <div className="row container">
        <p>Dados de teste</p>
      </div>
      <div className="card-container row">
        {cardData.testInfo.map((card, index) => (
          <CardInfo key={index} information={card} />
        ))}
      </div>
      <div className="row container container-bottom">
        <div className="col s12 m4 l3 center">
          <p className="title center">Casos registrados por sexo</p>
          <Pie
            width={100}
            data={genreData}
            options={{
              title: 'Casos por sexo',
            }}
          />
        </div>
        <div className="col s12 m7 l8 right">
          <p className="title center">Situação dos casos registrados</p>
          <Bar width={100} height={70} data={statusData} />
        </div>
      </div>
      <div className="row container">
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

export default Home;
