export const formatCpf = (cpf) => {
  return cpf
    ? cpf
        .replace(/[^\d]/g, '')
        .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    : '';
};

export const formatPhoneNumber = (phoneNumber) => {
  return phoneNumber
    ? phoneNumber
        .replace(/(\d{2})(\d{2})(\d)/, '$1 ($2)$3')
        .replace(/(\d)(\d{4})$/, '$1-$2')
    : '';
};

export const normalizeCpf = (cpf) => {
  return cpf.replace(/[^\d]/g, '');
};
