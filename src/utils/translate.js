export const translateStaus = (status) => {
  switch (status) {
    case 'descartado_por_isolamento':
      return 'descartado por isolamento';
    case 'descartado_por_teste':
      return 'descartado por teste';
    case 'internado_em_uti':
      return 'internado em UTI';
    case 'obito':
      return 'óbito';
    default:
      return status;
  }
};

export const translateFinalClassification = (status) => {
  switch (status) {
    case 'confirmacao_laboratorial':
      return 'Confirmação laboratorial';
    case 'confirmacao_clinico_epidemiologico':
      return 'Confirmação clínico epidemiológico';
    case 'nao_definido':
      return 'Não definido';
    default:
      return status;
  }
};

export const translateTestResult = (result) => {
  switch (result) {
    case true:
      return 'positivo';
    case false:
      return 'negativo';
    default:
      return 'Não realizado';
  }
};

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
      return 'None';
  }
};

export const translateRisk = (status) => {
  switch (status) {
    case 'critico':
      return 'crítico';
    case 'medio':
      return 'médio';
    default:
      return status;
  }
};

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
      return 'None';
  }
};

export const translateTestType = (status) => {
  switch (status) {
    case 'teste_rapido_anticorpo':
      return 'teste rápido - anticorpo';
    case 'teste_rapido_antigeno':
      return 'teste rápido - antígeno';
    case 'rt_prc':
      return 'RT - PCR';
    default:
      return 'Não solicitado';
  }
};

export const translateStausAndReturnColor = (status) => {
  switch (status) {
    case 'suspeito':
      return [status, '#FFF505aa'];
    case 'internado':
      return [status, '#FF9B05aa'];
    case 'descartado_por_isolamento':
      return ['descartado por isolamento', '#7159c1aa'];
    case 'descartado_por_teste':
      return ['descartado por teste', '#00aeffaa'];
    case 'curado':
      return [status, '#05FF1Eaa'];
    case 'obito':
      return ['óbito', '#33333333'];
    case 'em_tratamento_domiciliar':
      return ['em tratamento domiciliar', '#ee75a5aa'];
    case 'internado_em_uti':
      return ['internado em UTI', '#FF0505aa'];
    case 'ignorado':
      return [status, '#bebebeaa'];
    case 'cancelado':
      return [status, '#e2f06faa'];
    default:
      return ['Não analisado', '#aaaa'];
  }
};

export const translateBooleanValue = (data) => {
  switch (data) {
    case 1:
      return 'Sim';
    case 0:
      return 'Não';
    default:
      return data;
  }
};

export const translateStrategyType = (strategyType) => {
  switch (strategyType) {
    case 'basic_unity':
      return 'Unidade Básica de Saúde';
    case 'test_center':
      return 'Centro de Testagem';
    default:
      return strategyType;
  }
};
