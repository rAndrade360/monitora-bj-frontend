export const formatCpf = (cpf) => {
  let formatedCpf = cpf.replace(/[^\d]/g, '');
  return formatedCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const formatPhoneNumber = (phoneNumber) => {
  let formatedNumber = phoneNumber.replace(/(\d{2})(\d{2})(\d)/, '$1 ($2)$3');
  return formatedNumber.replace(/(\d)(\d{4})$/, '$1-$2');
};
