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
      const genreInfo = {
        labels: ['masculino', 'feminino'],
        datasets: [
          {
            data: [dashboardData.genre.masculino, dashboardData.genre.feminino],
            backgroundColor: ['rgba(90,178,255,0.6)', 'rgba(250,55,197,0.6)'],
          },
        ],
      };
      const statusInfo = {
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
