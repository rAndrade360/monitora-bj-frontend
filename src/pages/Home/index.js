import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import './styles.css';
import CardInfo from '../../components/CardInfo';
import api from '../../services/api';

function Home() {
  const [cardData, setCardData] = useState([]);
  const [genreData, setGenreData] = useState({});
  const [statusData, setStatusData] = useState({});
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    async function loadDashboardData() {
      const response = await api.get('/patients/dashboard');
      const dashboardData = response.data;
      const info = [
        {
          title: 'Baixo risco',
          value: dashboardData.risks.low,
          discription: 'Número de casos de risco baixo',
          color: '#05FF1E',
        },
        {
          title: 'Médio risco',
          value: dashboardData.risks.medium,
          discription: 'Número de casos de risco médio',
          color: '#FFF505',
        },
        {
          title: 'Alto risco',
          value: dashboardData.risks.high,
          discription: 'Número de casos de risco alto',
          color: '#FF9B05',
        },
        {
          title: 'Crítico risco',
          value: dashboardData.risks.critic,
          discription: 'Número de casos de risco crítico',
          color: '#FF0505',
        },
      ];
      const genreInfo = {
        labels: ['masculino', 'feminino'],
        datasets: [
          {
            data: [dashboardData.genre.male, dashboardData.genre.female],
            backgroundColor: ['rgba(90,178,255,0.6)', 'rgba(250,55,197,0.6)'],
          },
        ],
      };
      const statusInfo = {
        labels: [
          'suspeitos',
          'monitorados',
          'infectados',
          'descartados por isolamento',
          'descartado por teste',
          'recuperados',
          'óbitos',
        ],
        datasets: [
          {
            label: 'Situação geral',
            data: [
              dashboardData.status.suspect,
              dashboardData.status.monitored,
              dashboardData.status.infected,
              dashboardData.status.discarded_by_isolation,
              dashboardData.status.discarded_by_test,
              dashboardData.status.cured,
              dashboardData.status.death,
            ],
            backgroundColor: [
              '#FFF505',
              '#FF9B05',
              '#FF0505',
              '#7159c1',
              '#00aeff',
              '#05FF1E',
              '#333333',
            ],
          },
        ],
      };
      setCardData(info);
      setGenreData(genreInfo);
      setStatusData(statusInfo);
      setHasData(true);
    }
    loadDashboardData();
  }, []);

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
      <div className="card-container">
        {cardData.map((card, index) => (
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
    </div>
  );
}

export default Home;
