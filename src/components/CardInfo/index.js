import React from 'react';

import './styles.css';

function CardInfo({information}) {
  return (
    <div className="card" style={{borderBottomColor: information.color}}>
      <h2 className="card-title">{information.title}</h2>
      <p className="card-value" >{information.value}</p>
      <p className="card-date">{Date.now()}</p>
      <p className="card-discription">{information.discription}</p>
      </div>
  );
}

export default CardInfo;