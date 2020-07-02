import React from 'react';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import './styles.css';

function CardInfo({ information }) {
  return (
    <div className="card" style={{ borderBottomColor: information.color }}>
      <p className="title-card">{information.title}</p>
      <p className="card-value">{information.value}</p>
      <p className="card-date">
        {format(Date.now(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
      </p>
      <p className="card-discription">{information.discription}</p>
    </div>
  );
}

export default CardInfo;
