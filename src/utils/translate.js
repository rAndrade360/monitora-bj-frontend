export const translateStaus = (status) => {
  switch (status) {
    case 'suspect':
      return 'suspeito';
    case 'monitored':
      return 'monitorado';
    case 'infected':
      return 'infectado';
    case 'discarded_by_isolation':
      return 'descartado por isolamento';

    case 'discarded_by_test':
      return 'descartado por teste';
    case 'cured':
      return 'recuperado';
    case 'death':
      return 'óbito';
    default:
      return 'Não analisado'
  }
}

export const translateStausToEnglish = (status) => {
  switch (status) {
    case 'suspeito':
      return 'suspect';
    case 'monitorado':
      return 'monitored';
    case 'infectado':
      return 'infected';
    case 'descartado por isolamento':
      return 'discarded_by_isolation';

    case 'descartado por teste':
      return 'discarded_by_test';
    case 'recuperado':
      return 'cured';
    case 'óbito':
      return 'death';
    default:
      return 'None'
  }
}

export const translateRisk = (status) => {
  switch (status) {
    case 'low':
      return 'baixo';
    case 'medium':
      return 'médio';
    case 'high':
      return 'alto';
    case 'critic':
      return 'crítico';
    default:
      return 'Não analisado'
  }
}

export const translateRiskToEnglish = (status) => {
  switch (status) {
    case 'baixo':
      return 'low';
    case 'médio':
      return 'medium';
    case 'alto':
      return 'high';
    case 'crítico':
      return 'critic';
    default:
      return 'None'
  }
}

export const translateStausAndReturnColor = (status) => {
  switch (status) {
    case 'suspect':
      return ['suspeito', '#FFF505aa', ];
    case 'monitored':
      return ['monitorado',  '#FF9B05aa', ];
    case 'infected':
      return ['infectado', '#FF0505aa', ];
    case 'discarded_by_isolation':
      return ['descartado por isolamento', '#7159c1aa',];
    case 'discarded_by_test':
      return ['descartado por teste', '#00aeffaa', ];
    case 'cured':
      return ['recuperado', '#05FF1Eaa', ];
    case 'death':
      return ['óbito', '#33333333'];
    default:
      return ['Não analisado', '#aaaa']
  }
}

export const translateGenre = (genre) => {
  switch (genre) {
    case 'male':
      return 'masculino';
    case 'female':
      return 'feminino';
    default: 
      return 'Não definido'
  }
}

export const translateBooleanValue = (data) => {
  switch (data) {
    case 1:
      return 'Sim';
    case 0:
      return 'Não';
    default: 
      return data
  }
}
